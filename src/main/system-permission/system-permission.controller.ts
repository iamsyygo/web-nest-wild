import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query } from '@nestjs/common';
import { SystemPermissionService } from './system-permission.service';
import { CreateSystemPermissionDto } from './dto/create-system-permission.dto';
import { UpdateSystemPermissionDto } from './dto/update-system-permission.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Permission } from '@/decorator/permission.decorator';

@ApiTags('系统权限')
@Controller('system-permission')
export class SystemPermissionController {
  constructor(private readonly systemPermissionService: SystemPermissionService) {}

  @ApiOperation({ summary: '创建权限' })
  @Post()
  @HttpCode(201)
  create(@Body() createSystemPermissionDto: CreateSystemPermissionDto) {
    return this.systemPermissionService.create(createSystemPermissionDto);
  }

  @ApiOperation({ summary: '根据 ids 查询权限' })
  @ApiQuery({
    name: 'ids',
    description: '逗号拼接',
  })
  @Get('findByIds')
  findByIds(@Query('ids') ids: string) {
    return this.systemPermissionService.findByIds(ids);
  }

  @ApiOperation({ summary: '根据 id 查询权限' })
  @Permission('system-permission:query')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemPermissionService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSystemPermissionDto: UpdateSystemPermissionDto) {
    return this.systemPermissionService.update(+id, updateSystemPermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemPermissionService.remove(+id);
  }
}
