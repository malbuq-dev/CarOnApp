import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';

import dayjs from '../config/dayjs.config';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response<any> = ctx.getResponse<Response>();
    const status: number = exception.getStatus();
    const message: any = exception.getResponse();

    response.status(status).json({
      ...(status === 429 ? { message } : { ...message }),
      timestamp: dayjs().tz('America/Recife').toISOString(),
    });
  }
}
