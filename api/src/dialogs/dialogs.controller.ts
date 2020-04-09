import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators';
import { Dialog } from './schemas/dialog.schema';
import { CreateDialogDto, UpdateDialogDto } from './dto';
import { DialogsService } from './dialogs.service';

@Auth()
@ApiTags('Dialogs')
@Controller('dialogs')
export class DialogsController {
  constructor(private readonly dialogsService: DialogsService) {}

  @Get()
  findAll(@Req() req): Promise<Dialog[]> {
    const userId = req.user._id;
    return this.dialogsService.findAll(userId);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Dialog> {
    return this.dialogsService.findById(id);
  }

  @Post()
  create(@Body() body: CreateDialogDto): Promise<Dialog> {
    return this.dialogsService.create(body);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateDialogDto,
  ): Promise<Dialog> {
    return this.dialogsService.update(id, body);
  }

  @Put(':id/user/:userId')
  inviteUser(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ): Promise<Dialog> {
    return this.dialogsService.inviteUser(id, userId);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Dialog> {
    return this.dialogsService.delete(id);
  }

  @Delete(':id/user/:userId')
  removeUser(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ): Promise<Dialog> {
    return this.dialogsService.removeUser(id, userId);
  }
}
