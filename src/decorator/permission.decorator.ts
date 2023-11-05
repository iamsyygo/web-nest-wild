import { SetMetadata } from '@nestjs/common';

// 权限控制 e.q. @Permission(string | string[])
export const Permission = (permission: string | string[]) => SetMetadata('PERMISSION', permission);
