import { ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtPermissionGuard extends AuthGuard('jwt') {
  @Inject(Reflector) private readonly reflector: Reflector;
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
  handleRequest(err, user, info, context: ExecutionContext) {
    const NO_NEET_JWT = this.reflector.getAllAndOverride<boolean>('NO_NEET_JWT', [
      context.getClass(),
      context.getHandler(),
    ]);

    if (NO_NEET_JWT) return;

    if (err || !user) throw err || new UnauthorizedException('Unauthorized 🤷‍♂️');
    return user;
  }
  // 获取身份验证选项
  // getAuthenticateOptions(context: ExecutionContext): IAuthModuleOptions<any> {
  //   const ctx = GqlExecutionContext.create(context);
  //   const { req } = ctx.getContext();
  //   return { property: 'user', req };
  // }
}
