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

  async delete(_id: Message['_id'], owner: string) {
    const message = await this.messageModel.findOneAndDelete({ _id, owner });
    const {  dialog: dialogId } = message;

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

  async update(_id: Message['_id'], body: Message['body'], owner: string) {
    return await this.messageModel.findOneAndUpdate(
      { _id, owner },
      { $set: { body } },
      { new: true },
    );
  }
}
