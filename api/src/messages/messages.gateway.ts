import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger, UsePipes, ValidationPipe, OnModuleInit } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { CreateMessagDto, DeleteMessageDto, UpdateMessageDto } from './dto';
import { MessagesService } from './messages.service';
import { AuthSocket } from './middlewares/auth.middleware';

@UsePipes(new ValidationPipe({ transform: true }))
@WebSocketGateway({ namespace: 'messages' })
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
  @WebSocketServer() private readonly server: Server;
  private readonly logger: Logger = new Logger('MessagesGateway');

  constructor(private readonly messagesService: MessagesService) {}

  onModuleInit() {
    this.server.use(AuthSocket);
  }

  @SubscribeMessage('send')
  async handleSendMessage(client: Socket, payload: CreateMessagDto) {
    const owner = client.request.user._id;

    const message = await this.messagesService.create({ ...payload, owner });
    const { dialog } = message;

    client.to(dialog).emit('send', message);
  }

  @SubscribeMessage('delete')
  async handleDeleteMessage(client: Socket, { messageId }: DeleteMessageDto) {
    const owner = client.request.user._id;
    const message = await this.messagesService.delete(messageId, owner);
    client.to(message.dialog).emit('delete', message);
  }

  @SubscribeMessage('update')
  async handleUpdateMessage(
    client: Socket,
    { messageId, body }: UpdateMessageDto,
  ) {
    const owner = client.request.user._id;
    const message = await this.messagesService.update(messageId, body, owner);
    client.to(message.dialog).emit('update', message);
  }

  @SubscribeMessage('typing')
  async handleTyping(client: Socket, { dialog }) {
    const userId = client.request.user._id;
    client.to(dialog).emit('typing', { userId });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
