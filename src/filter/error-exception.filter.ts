import * as chalk from 'chalk';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch(Error) // 捕获Error异常
export class ErrorExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(chalk.red(' ✘ '));

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = 500;
    let message = '服务器错误';

    if (exception instanceof Error) {
      message = exception.message;
      this.logger.error(`${exception.name}: ${exception.message}`);
      const stack = exception.stack;
    }

    const result = {
      success: false,
      status,
      message: '',
      timestamp: +new Date(),
      uri: request.url,
    };

    // exception.stack,

    response.status(status).json(result);
  }
}
