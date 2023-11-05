import * as chalk from 'chalk';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch(HttpException) // 捕获 Http 异常
// @Catch() // 捕获所有异常
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(chalk.red(' ✘ '));

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    let message = exception.message || '请求失败';

    // class-validator error
    if (exception instanceof BadRequestException) {
      const errors = exception.getResponse() as any;
      message = errors.message[0];
    }

    // server error
    if (status === 500) {
      message = '服务器错误';
    }
    const result = {
      success: false,
      status,
      message,
      timestamp: +new Date(),
      uri: request.url,
    };

    this.logger.error(`${request.method} \`${request.url}\` ${status}`);

    response.status(status).json(result);
  }
}
