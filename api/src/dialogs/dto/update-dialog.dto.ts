import { IsString, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDialogDto {
  @IsString()
  name: string;

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'uuid' } })
  @IsMongoId({ each: true })
  owners: string[];

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'uuid' } })
  @IsMongoId({ each: true })
  members: string[];
}
