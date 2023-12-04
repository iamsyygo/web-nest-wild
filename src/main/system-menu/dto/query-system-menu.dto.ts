import { ApiProperty } from '@nestjs/swagger';

export class QuerySystemMenuTreeDto {
  @ApiProperty({ description: '角色 ids' })
  ids: number[];
}
