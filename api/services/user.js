import { Container } from 'typedi';

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
}

export default new UserService(Container);
