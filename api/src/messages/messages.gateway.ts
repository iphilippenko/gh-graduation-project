import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { Auth } from 'src/common/decorators';
import { CreateMessagDto, DeleteMessageDto, UpdateMessageDto } from './dto';
import { MessagesService } from './messages.service';

// @Auth()
@UsePipes(new ValidationPipe({ transform: true }))
@WebSocketGateway({ namespace: 'messages' })
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly messagesService: MessagesService) {}

  @WebSocketServer() server: Server;
  private readonly logger: Logger = new Logger('MessagesGateway');

  @SubscribeMessage('send')
  async handleSendMessage(client: Socket, payload: CreateMessagDto) {
    const message = await this.messagesService.create(payload);
    const { dialog } = message;

    client.to(dialog).emit('send', message);
  }

  @SubscribeMessage('delete')
  async handleDeleteMessage(client: Socket, { messageId }: DeleteMessageDto) {
    const message = await this.messagesService.delete(messageId);
    client.to(message.dialog).emit('delete', message);
  }

  @SubscribeMessage('update')
  async handleUpdateMessage(
    client: Socket,
    { messageId, body }: UpdateMessageDto,
  ) {
    const message = await this.messagesService.update(messageId, body);
    client.to(message.dialog).emit('update', message);
  }

  @SubscribeMessage('typing')
  async handleTyping(client: Socket, { userId, dialog }) {
    client.to(dialog).emit('typing', { userId });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
