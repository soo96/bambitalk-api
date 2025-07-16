import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { DefaultEventsMap, Server, Socket } from 'socket.io';
import { SendMessageDto } from '../message/dto/send-message.dto';
import { SendMessageCommand } from 'src/domain/message/command/send-message.command';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';
import { JwtPayload } from 'src/support/jwt.util';
import { AuthPayload } from '../auth/interface/auth-payload';
import { MessageUseCase } from 'src/application/message/message.use-case';
import { DomainErrorCode } from 'src/domain/common/errors/domain-error-code';
import { getErrorMessage } from 'src/support/error-message.util';

@WebSocketGateway({
  namespace: '/chats',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly messageUseCase: MessageUseCase,
    private readonly jwtService: JwtService
  ) {}

  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    console.log(`on connect called : ${client.id}`);
    const token = client.handshake.auth?.token as string | undefined;

    if (!token) {
      this.sendError(client, DomainErrorCode.UNAUTHORIZED);
      return;
    }

    try {
      const { coupleId, userId }: JwtPayload = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      client.data.userId = userId;
      client.data.coupleId = coupleId;

      if (!coupleId) {
        this.logger.error('coupleId 없음');
        this.sendError(client, DomainErrorCode.UNAUTHORIZED);
        return;
      }

      await client.join(`couple-${coupleId}`);
      console.log(`✅ User joined room: couple-${coupleId}`);

      await this.messageUseCase.readAllMessages(coupleId, userId);
      this.server.to(`couple-${client.data.coupleId}`).emit('update_read_status', userId);
    } catch (error) {
      this.logger.error('JWT 검증 실패:', error);
      this.sendError(client, DomainErrorCode.UNAUTHORIZED);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`❌ User disconnected: ${client.id}`);
  }

  @SubscribeMessage('send_message')
  async handleMessage(
    @MessageBody() payload: SendMessageDto,
    @ConnectedSocket()
    client: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, AuthPayload>
  ) {
    const command: SendMessageCommand = {
      coupleId: client.data.coupleId,
      senderId: client.data.userId,
      ...payload,
    };

    try {
      const savedMessage = await this.messageUseCase.saveMessage(command);

      this.server.to(`couple-${client.data.coupleId}`).emit('receive_message', savedMessage);
    } catch (error) {
      this.logger.error('메시지 저장 실패', error);
      this.sendError(client, DomainErrorCode.DB_SERVER_ERROR);
    }
  }

  @SubscribeMessage('read_all_messages')
  async readAllMessages(
    @ConnectedSocket()
    client: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, AuthPayload>
  ) {
    await this.messageUseCase.readAllMessages(client.data.coupleId, client.data.userId);

    this.server.to(`couple-${client.data.coupleId}`).emit('update_read_status', client.data.userId);
  }

  sendError(client: Socket, errorCode: DomainErrorCode) {
    const message = getErrorMessage(errorCode);

    this.server.to(`couple-${client.data.coupleId}`).emit('error', {
      code: errorCode,
      message,
    });
  }
}
