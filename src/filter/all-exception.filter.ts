import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import * as chalk from 'chalk';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(chalk.red(' ✘ '));

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = '请求失败';

    // class-validator error
    // if (exception instanceof BadRequestException) {
    //   const errors = exception.getResponse() as any;
    //   message = errors.message[0];
    // }

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message || '请求失败';
      this.logger.error(`${exception.name}: ${message}`);
    } else {
      const e = exception as Error;
      message = e.message || '服务器错误';
      this.logger.error(`${e.name}: ${e.message}`);
    }

    const body = {
      success: false,
      status,
      message,
      timestamp: +new Date(),
      uri: ctx.getRequest().url,
    };
    const response = ctx.getResponse();
    response.status(status).json(body);
  }
}
