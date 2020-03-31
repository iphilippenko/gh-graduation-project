import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Message } from './schemas/message.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('Message')
    private readonly dialogModel: Model<Message & Document>,
  ) {}

  create(message: Partial<Message>) {
    return this.dialogModel.create(message);
  }

  delete(id: Message['_id']) {
    return this.dialogModel.findByIdAndDelete(id);
  }

  async findAll(dialog: Message['dialog']) {
    return await this.dialogModel.find({ dialog });
  }

  async update(id: Message['_id'], body: Message['body']) {
    return await this.dialogModel.findByIdAndUpdate(
      id,
      { $set: { body } },
      { new: true },
    );
  }
}
