import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Dialog } from './schemas/dialog.schema';
import { SearchQueries } from 'src/common/dto/SearchQueries.dto';

@Injectable()
export class DialogsService {
  constructor(
    @InjectModel('Dialog')
    private readonly dialogModel: Model<Dialog & Document>,
  ) {}

  create(dialog: Partial<Dialog>) {
    return this.dialogModel.create(dialog);
  }

  delete(id: Dialog['_id']) {
    return this.dialogModel.findByIdAndDelete(id);
  }

  async findAll(userId) {
    return await this.dialogModel.find({ members: userId });
  }

  findById(id: Dialog['_id']) {
    return this.dialogModel.findById(id);
  }

  async update(id: Dialog['_id'], dialog: Partial<Dialog>) {
    return await this.dialogModel.findByIdAndUpdate(
      id,
      { $set: dialog },
      { new: true },
    );
  }

  inviteUser(id, userId) {
    return this.dialogModel.findByIdAndUpdate(
      id,
      {
        $set: { $push: { members: userId } },
      },
      { new: true },
    );
  }

  removeUser(id, userId) {
    return this.dialogModel.findByIdAndUpdate(
      id,
      {
        $set: { $pull: { members: userId } },
      },
      { new: true },
    );
  }
}
