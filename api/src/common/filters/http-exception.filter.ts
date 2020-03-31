import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
  private logger: Logger = new Logger('Exception filter');

  catch(exception: MongoError | HttpException, host: ArgumentsHost) {
    const MongoBadRequestCodes = [11000];
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    switch (true) {
      case exception instanceof MongoError &&
        MongoBadRequestCodes.includes(exception.code):
        return res.status(400).json({
          statusCode: 400,
          message: exception.message,
        });
      default:
        this.logger.error(exception);
        super.catch(exception, host);
    }
  }
}
