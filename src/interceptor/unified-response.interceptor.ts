import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class UnifiedResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const status = response.statusCode;
        return {
          code: status || 200,
          data,
          message: '请求成功',
          timestamp: +Date.now(),
          uri: request.url,
          success: true,
        };
      }),
    );
  }
}
