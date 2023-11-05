import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { SystemUserService } from '@/main/system-user/system-user.service';
import { SystemRoleService } from '@/main/system-role/system-role.service';
import { Payload } from '@/main/system-user/types';
import { SystemPermission } from '@/main/system-permission/entities/system-permission.entity';

@Injectable()
export class RolePermissionGuard implements CanActivate {
  //   @Inject(SystemUserService) private userService: SystemUserService;
  @Inject(SystemRoleService) private roleService: SystemRoleService;
  @Inject(Reflector) private reflector: Reflector;
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    // 没有用户信息，不需要权限
    if (!request.user) return true;

    const PERMISSION = this.reflector.get<string | string[]>('PERMISSION', context.getHandler());

    // 没有权限，不需要权限
    if (!PERMISSION) return true;
    const metaValues = Array.isArray(PERMISSION) ? PERMISSION : [PERMISSION];

    // 获取当前用户的角色
    const ids = (request.user as Payload).roles?.map((r) => r.id).join(',');
    // if (!ids) throw new UnauthorizedException('没有访问该接口权限 🤦‍♂️');

    // TODO: 优化查询 redis 缓存，减少数据库查询
    const roles = await this.roleService.findByIds(ids);
    const permissions: SystemPermission[] = roles.reduce((tol, cur) => {
      tol.push(...cur.permissions);
      return tol;
    }, []);

    // 判断当前用户是否有访问该接口的权限
    const has = permissions.some((p) => metaValues.includes(p.value));
    if (!has) throw new UnauthorizedException('没有该接口访问权限 🤦‍♂️');
    return true;
  }
}
