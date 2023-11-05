import { ApiParam, ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateSystemUserDto } from './create-system-user.dto';

export class UpdateSystemUserDto extends PartialType(CreateSystemUserDto) {
  @ApiPropertyOptional({ description: '角色 ids' })
  roles: string;

  @ApiProperty({ description: 'id' })
  id: number;
}
