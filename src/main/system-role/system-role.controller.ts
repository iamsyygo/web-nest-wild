import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SystemRoleService } from './system-role.service';
import { CreateSystemRoleDto } from './dto/create-system-role.dto';
import { UpdateSystemRoleDto } from './dto/update-system-role.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkipJwt } from '@/decorator/jwt-allowlist.decorator';

@ApiTags('系统角色')
@Controller('system-role')
export class SystemRoleController {
  constructor(private readonly systemRoleService: SystemRoleService) {}

  @ApiOperation({ summary: '创建系统角色' })
  @SkipJwt()
  @Post('create')
  create(@Body() createSystemRoleDto: CreateSystemRoleDto) {
    return this.systemRoleService.create(createSystemRoleDto);
  }

  @ApiOperation({ summary: '根据 ids 删除多个角色' })
  @ApiBody({
    description: '角色 ids',
  })
  @Post('delete-by-ids')
  findByIds(@Body('ids') ids: string) {
    return this.systemRoleService.findByIds(ids);
  }

  @Get()
  findAll() {
    return this.systemRoleService.findAll();
  }

  @ApiOperation({ summary: '根据 id 获取系统角色' })
  @SkipJwt()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemRoleService.findOne(+id);
  }

  @ApiOperation({ summary: '根据 id 更新系统角色' })
  @Patch(':id')
  @SkipJwt()
  update(@Param('id') id: string, @Body() updateSystemRoleDto: UpdateSystemRoleDto) {
    return this.systemRoleService.update(+id, updateSystemRoleDto);
  }

  @ApiOperation({ summary: '根据 id 删除系统角色' })
  @SkipJwt()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemRoleService.remove(+id);
  }
}
