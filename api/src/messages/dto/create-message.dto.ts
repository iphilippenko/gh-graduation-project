import { IsString, IsMongoId } from 'class-validator';

export class CreateMessagDto {
  @IsString()
  body: string;

  @IsMongoId()
  dialog: string;

  @IsMongoId()
  owner: string;
}
