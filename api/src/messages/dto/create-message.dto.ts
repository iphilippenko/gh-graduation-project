import { IsString, IsUUID } from 'class-validator';

export class CreateMessagDto {
  @IsString()
  message: string;

  @IsUUID()
  chatId: string;
}
