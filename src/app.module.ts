import jsYaml from '@/config/js-yaml';
import TypeOrmModule from '@/config/typeorm';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllExceptionsFilter } from './filter/all-exception.filter';
import { JwtPermissionGuard } from './guard/jwt-permission.guard';
import { RolePermissionGuard } from './guard/role-permission.guard';
import { UnifiedResponseInterceptor } from './interceptor/unified-response.interceptor';
import { AuthenticationModule } from './main/authentication/authentication.module';
import { SystemPermissionModule } from './main/system-permission/system-permission.module';
import { SystemRoleModule } from './main/system-role/system-role.module';
import { SystemUserModule } from './main/system-user/system-user.module';
import { RedisModule } from './main/redis/redis.module';
import { SystemMenuModule } from './main/system-menu/system-menu.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jsYaml],
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule,
    // 限流 60s 内 10 次请求
    // ThrottlerModule.forRoot({ throttlers: [{ ttl: 60000, limit: 10, ignoreUserAgents: [] }] }),
    SystemUserModule,
    SystemRoleModule,
    SystemPermissionModule,
    AuthenticationModule,
    RedisModule,
    SystemMenuModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: JwtPermissionGuard },
    { provide: APP_GUARD, useClass: RolePermissionGuard },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    // { provide: APP_FILTER, useClass: HttpExceptionFilter },
    // { provide: APP_FILTER, useClass: ErrorExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: UnifiedResponseInterceptor },
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class AppModule {}
