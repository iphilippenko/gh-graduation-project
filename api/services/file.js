import * as path from 'path';
import * as fs from 'fs';

class FileService {
  constructor() {
    this.fileDir = path.resolve(__dirname, '../../uploads/');
  }

  getFile(filename) {
    const filePath = path.resolve(this.fileDir, filename);
    return fs.createReadStream(filePath);
  }
}

export default new FileService();
