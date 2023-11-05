import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SystemRoleService } from './system-role.service';
import { CreateSystemRoleDto } from './dto/create-system-role.dto';
import { UpdateSystemRoleDto } from './dto/update-system-role.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('系统角色')
@Controller('system-role')
export class SystemRoleController {
  constructor(private readonly systemRoleService: SystemRoleService) {}

  @ApiOperation({ summary: '创建系统角色' })
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemRoleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSystemRoleDto: UpdateSystemRoleDto) {
    return this.systemRoleService.update(+id, updateSystemRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemRoleService.remove(+id);
  }
}
