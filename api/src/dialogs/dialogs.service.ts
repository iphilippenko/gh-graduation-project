import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document, DocumentQuery } from 'mongoose';
import { populateUserRelationshipOptions } from 'src/common/utils';
import { Dialog } from './schemas/dialog.schema';

@Injectable()
export class DialogsService {
  constructor(
    @InjectModel('Dialog')
    private readonly dialogModel: Model<Dialog & Document>,
  ) {}

  private async populate<T extends (Dialog & Document) | (Dialog & Document)[]>(
    documentQuery: DocumentQuery<T, Dialog & Document, {}>,
  ): Promise<T> {
    return documentQuery
      .populate(populateUserRelationshipOptions('members'))
      .populate(populateUserRelationshipOptions('owners'))
      .populate({
        path: 'lastMessage',
        populate: populateUserRelationshipOptions('owner'),
      })
      .exec();
  }

  async create(dialog: Partial<Dialog>) {
    const user = await this.dialogModel.create(dialog);
    return await user
      .populate(populateUserRelationshipOptions('members'))
      .populate(populateUserRelationshipOptions('owners'))
      .execPopulate();
  }

  delete(id: Dialog['_id']) {
    return this.populate(this.dialogModel.findByIdAndDelete(id));
  }

  async findAll(userId) {
    return this.populate<(Dialog & Document)[]>(
      this.dialogModel.find({ members: userId }),
    );
  }

  async findById(id: Dialog['_id']) {
    return await this.populate(this.dialogModel.findById(id));
  }

  async update(id: Dialog['_id'], dialog: Partial<Dialog>) {
    return await this.populate(
      this.dialogModel.findByIdAndUpdate(id, { $set: dialog }, { new: true }),
    );
  }

  inviteUser(id, userId) {
    return this.populate(
      this.dialogModel.findByIdAndUpdate(
        id,
        {
          $set: { $push: { members: userId } },
        },
        { new: true },
      ),
    );
  }

  removeUser(id, userId) {
    return this.populate(
      this.dialogModel.findByIdAndUpdate(
        id,
        {
          $set: { $pull: { members: userId } },
        },
        { new: true },
      ),
    );
  }
}
