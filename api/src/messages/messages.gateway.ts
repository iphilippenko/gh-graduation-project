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

  private joinRoom = (client: Socket, dialog: string) => {
    client.join(dialog);
  };

  private leaveRoom = (client: Socket, dialog: string) => {
    client.leave(dialog);
  };

  private emitEvent = (
    client: Socket,
    event: string,
    dialog: string,
    data: object,
  ) => {
    this.joinRoom(client, dialog);
    client.to(dialog).emit(event, data);
  };

  @SubscribeMessage('join')
  async handleJoin(client: Socket, dialog: string) {
    this.joinRoom(client, dialog);
  }

  @SubscribeMessage('leave')
  async handleLeave(client: Socket, dialog: string) {
    this.leaveRoom(client, dialog);
  }

  @SubscribeMessage('send')
  async handleSendMessage(client: Socket, payload: CreateMessagDto) {
    const owner = client.request.user._id;
    const message = await this.messagesService.create({ ...payload, owner });
    const { dialog } = message;

    this.emitEvent(client, 'send', dialog, message);
  }

  @SubscribeMessage('delete')
  async handleDeleteMessage(client: Socket, { messageId }: DeleteMessageDto) {
    const owner = client.request.user._id;
    const message = await this.messagesService.delete(messageId, owner);

    this.emitEvent(client, 'delete', message.dialog, message);
  }

  @SubscribeMessage('update')
  async handleUpdateMessage(
    client: Socket,
    { messageId, body }: UpdateMessageDto,
  ) {
    const owner = client.request.user._id;
    const message = await this.messagesService.update(messageId, body, owner);
    this.emitEvent(client, 'update', message.dialog, message);
  }

  @SubscribeMessage('start-typing')
  async handleStartTyping(client: Socket, dialog: string) {
    const userId = client.request.user._id;
    this.emitEvent(client, 'start-typing', dialog, { userId, dialog });
  }

  @SubscribeMessage('end-typing')
  async handleEndTyping(client: Socket, dialog: string) {
    const userId = client.request.user._id;
    this.emitEvent(client, 'end-typing', dialog, { userId, dialog });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
