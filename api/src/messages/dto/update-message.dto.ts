import { IsString, IsMongoId } from 'class-validator';

export class UpdateMessageDto {
  @IsMongoId()
  messageId: string;

  @IsString()
  body: string;
}
