import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from 'src/domain/chat/chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { SendMessageCommand } from 'src/domain/chat/command/sendMessageDto';

@WebSocketGateway({
  namespace: '/chats',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    console.log(`on connect called : ${client.id}`);
    let { coupleId } = client.handshake.query;

    if (Array.isArray(coupleId)) {
      coupleId = coupleId[0];
    }

    if (coupleId) {
      await client.join(`couple-${coupleId}`);
      console.log(`✅ User joined room: couple-${coupleId}`);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`❌ User disconnected: ${client.id}`);
  }

  @SubscribeMessage('send_message')
  async handleMessage(@MessageBody() payload: SendMessageDto) {
    const command: SendMessageCommand = {
      coupleId: payload.coupleId,
      senderId: payload.senderId,
      content: payload.content,
    };

    const savedMessage = await this.chatService.saveMessage(command);

    const response = {
      id: savedMessage.messageId,
      senderId: savedMessage.senderId,
      text: savedMessage.content,
      time: savedMessage.sentAt,
    };

    this.server.to(`couple-${payload.coupleId}`).emit('receive_message', response);
  }
}
