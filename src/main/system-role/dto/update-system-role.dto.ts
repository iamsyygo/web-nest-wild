import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSystemRoleDto } from './create-system-role.dto';

export class UpdateSystemRoleDto extends PartialType(CreateSystemRoleDto) {
  @ApiProperty({ description: '角色 id' })
  id: number;
}
