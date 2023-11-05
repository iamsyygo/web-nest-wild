import { ApiProperty } from '@nestjs/swagger';

export class CreateSystemRoleDto {
  @ApiProperty({ description: '角色名称', example: '超级管理员' })
  name: string;
}
