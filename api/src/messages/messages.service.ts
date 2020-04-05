import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { SearchQueries } from 'src/common/dto/SearchQueries.dto';
import { DialogsService } from 'src/dialogs/dialogs.service';
import { Message } from './schemas/message.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('Message')
    private readonly messageModel: Model<Message & Document>,
    private readonly dialogsService: DialogsService,
  ) {}

  async create(data: Partial<Message>) {
    const message = await this.messageModel.create(data);
    const { _id, dialog } = message;

    await this.dialogsService.update(dialog, { lastMessage: _id });
    return message;
  }

  async delete(id: Message['_id']) {
    const message = await this.messageModel.findByIdAndDelete(id);
    const { _id, dialog: dialogId } = message;

    let dialog = await this.dialogsService.findById(dialogId);
    if (String(dialog.lastMessage) === String(_id)) {
      const lastMessage = await this.findLastMessage();
      dialog.lastMessage = lastMessage ? lastMessage._id : '';
      await dialog.save();
    }

    return message;
  }

  async findAll(
    dialog: Message['dialog'],
    { search, limit, skip }: SearchQueries = {},
  ) {
    const filters = search ? { body: { $regex: search, $options: 'i' } } : {};
    return await this.messageModel
      .find({ dialog, ...filters })
      .skip(skip)
      .limit(limit);
  }

  async findLastMessage() {
    return this.messageModel.findOne({}).sort({ createdAt: 'desc' });
  }

  async update(id: Message['_id'], body: Message['body']) {
    return await this.messageModel.findByIdAndUpdate(
      id,
      { $set: { body } },
      { new: true },
    );
  }
}
