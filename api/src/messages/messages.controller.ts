import { Controller, UseGuards, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchQueries } from 'src/common/dto/SearchQueries.dto';
import { Message } from './schemas/message.schema';
import { MessagesService } from './messages.service';
import { Auth } from 'src/common/decorators';

@Auth()
@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':dialogId')
  findAll(
    @Param('dialogId') dialogId: string,
    @Query() query: SearchQueries,
  ): Promise<Message[]> {
    return this.messagesService.findAll(dialogId, query);
  }
}
