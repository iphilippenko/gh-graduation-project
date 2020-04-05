import {
  Controller,
  UseInterceptors,
  Post,
  BadRequestException,
  UploadedFile,
  Res,
  Param,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiBody,
  ApiConsumes,
  ApiParam,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { FileUploadDto } from './dto/file-upload.dto';
import { generateFileName, isImage } from './utils/images.util';

const dirName = './uploads'

@ApiTags('Files')
@Controller('files')
export class FilesController {
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: dirName,
        filename: generateFileName,
      }),
      fileFilter: isImage,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDto })
  @Post()
  uploadFile(@UploadedFile() file) {
    if (!file) throw new BadRequestException('File is required');
    return { path: `${file.filename}` };
  }

  @Get(':filename')
  @ApiParam({ name: 'filename', required: true })
  getFile(@Param('filename') file, @Res() res) {
    return res.sendFile(file, { root: dirName });
  }
}
