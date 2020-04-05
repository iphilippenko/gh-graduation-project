import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  private readonly unselectPrivateFields = '-salt -hash';

  constructor(
    @InjectModel('User') private readonly userModel: Model<User & Document>,
  ) {}

  create(user: Partial<User>) {
    return this.userModel.create(user);
  }

  async update(id: User['_id'], user: Partial<User>) {
    return await this.userModel.findByIdAndUpdate(
      id,
      { $set: user },
      { new: true },
    );
  }

  findAll(filters: Partial<User> = {}) {
    return this.userModel.find(filters).select(this.unselectPrivateFields);
  }

  async findById(id: User['_id']) {
    return await this.userModel.findById(id).select(this.unselectPrivateFields);
  }

  async findOne(matches: Partial<User>) {
    return await this.userModel
      .findOne(matches)
      .select(this.unselectPrivateFields);
  }

  delete(id: User['_id']) {
    return this.userModel
      .findByIdAndRemove(id)
      .select(this.unselectPrivateFields);
  }

  async getCredsFields(userName: User['userName']) {
    const userPromise = this.userModel
      .findOne({ userName })
      .select('salt hash _id userName');
    const user = await userPromise.exec();
    return user;
  }
}
