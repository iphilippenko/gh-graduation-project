import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Message } from './schemas/message.schema';
import { MessagesService } from './messages.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('local'))
@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly dialogsService: MessagesService) {}

  @Get(':dialogId')
  findAll(@Param('dialogId') dialogId: string): Promise<Message[]> {
    return this.dialogsService.findAll(dialogId);
  }
}
