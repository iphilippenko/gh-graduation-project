import { ApiQuery } from '@nestjs/swagger';
import { SwaggerEnumType } from '@nestjs/swagger/dist/types/swagger-enum.type';
import { applyDecorators } from '@nestjs/common';

interface Metadata {
  name: string;
  description?: string;
  required?: boolean;
  type?: any;
  isArray?: boolean;
  enum?: SwaggerEnumType;
  collectionFormat?: 'csv' | 'ssv' | 'tsv' | 'pipes' | 'multi';
}

export function ApiQueries(fileds: Metadata[]) {
  return applyDecorators(...fileds.map(query => ApiQuery(query)));
}
