import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import { DefaultEventsMap, Server, Socket } from 'socket.io';
import { ChatService } from 'src/domain/chat/chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { SendMessageCommand } from 'src/domain/chat/command/sendMessageDto';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';
import { JwtPayload } from 'src/support/jwt.util';
import { AuthPayload } from './interface/auth-payload';

@WebSocketGateway({
  namespace: '/chats',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService
  ) {}

  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    console.log(`on connect called : ${client.id}`);
    const token = client.handshake.auth?.token as string | undefined;

    if (!token) {
      throw new WsException('Unauthorized');
    }

    try {
      const payload: JwtPayload = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      client.data.userId = payload.userId;
      client.data.coupleId = payload.coupleId;

      await client.join(`couple-${payload.coupleId}`);
      console.log(`✅ User joined room: couple-${payload.coupleId}`);
    } catch (error) {
      this.logger.error('JWT 검증 실패:', error);
      throw new WsException('Unauthorized');
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
      content: payload.content,
    };

    const savedMessage = await this.chatService.saveMessage(command);

    const response = {
      id: savedMessage.messageId,
      senderId: savedMessage.senderId,
      text: savedMessage.content,
      time: savedMessage.sentAt,
    };

    this.server.to(`couple-${client.data.coupleId}`).emit('receive_message', response);
  }
}
