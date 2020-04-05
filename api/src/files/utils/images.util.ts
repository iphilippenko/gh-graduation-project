import { BadRequestException } from '@nestjs/common';
import * as path from 'path';
import { UploadedFile } from '../interfaces/file.interface';

export const isImage = (req, file: UploadedFile, callback) => {
  if (!file.mimetype.match(/image\/(png|jpeg)/)) {
    const error = 'Not allowed image format!';
    return callback(new BadRequestException(error), false);
  }
  callback(null, true);
};

export const generateFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = path.extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};
