import { IsString, IsNumber, IsOptional } from 'class-validator';

export class SearchQueries {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsNumber()
  skip?: number;
}
