import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Dialog } from './schemas/dialog.schema';
import { CreateDialogDto, UpdateDialogDto } from './dto';
import { DialogsService } from './dialogs.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('local'))
@ApiTags('Dialogs')
@Controller('dialogs')
export class DialogsController {
  constructor(private readonly dialogsService: DialogsService) {}

  @Get()
  findAll(): Promise<Dialog[]> {
    return this.dialogsService.findAll();
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
  inviteUser(@Param('id') id: string, @Param('userId') userId: string) {
    return this.dialogsService.inviteUser(id, userId);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.dialogsService.delete(id);
  }

  @Delete(':id/user/:userId')
  removeUser(@Param('id') id: string, @Param('userId') userId: string) {
    return this.dialogsService.removeUser(id, userId);
  }
}
