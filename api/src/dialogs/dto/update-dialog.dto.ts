import { IsString } from 'class-validator';

export class UpdateDialogDto {
  @IsString({ each: true })
  owners: string[];

  @IsString({ each: true })
  members: string[];
}
