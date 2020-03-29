import {Container} from 'typedi';

class UserService {
  constructor(container) {
    this.fileService = container.get('fileService');
    this.userModel = container.get('userModel');
  }

  async create(data) {
    const user = await this.userModel.create(data);
    return user;
  }

  async findOne(filters) {
    const user = await this.userModel.findOne(filters);
    return user;
  }

  async findOneAndUpdate(filters, data) {
    const user = await this.userModel.findOneAndUpdate(filters, data, {
      new: true,
    });
    return user;
  }
}

export default new UserService(Container);
