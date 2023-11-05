import { ApiProperty } from '@nestjs/swagger';

export class CreateSystemPermissionDto {
  @ApiProperty({ description: '权限名称', example: '新增' })
  name: string;

  @ApiProperty({ description: '权限值', example: '011001' })
  value: string;
}
