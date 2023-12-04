import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SystemMenuService } from './system-menu.service';
import { CreateSystemMenuDto } from './dto/create-system-menu.dto';
import { UpdateSystemMenuDto } from './dto/update-system-menu.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { SkipJwt } from '@/decorator/jwt-allowlist.decorator';
import { QuerySystemMenuTreeDto } from './dto/query-system-menu.dto';
import { User } from '@/decorator/user.decorator';
import { SystemUser } from '../system-user/entities/system-user.entity';

@Controller('system-menu')
export class SystemMenuController {
  constructor(private readonly systemMenuService: SystemMenuService) {}

  @ApiOperation({ summary: '创建系统菜单' })
  @SkipJwt()
  @Post('create-menu')
  createMenu(@Body() createSystemMenuDto: CreateSystemMenuDto) {
    return this.systemMenuService.createMenu(createSystemMenuDto);
  }

  @ApiOperation({ summary: '获取系统菜单树' })
  @ApiBody({ description: '角色 ids', type: QuerySystemMenuTreeDto })
  @Post('menu-tree')
  findMenuTree(@Body() body: QuerySystemMenuTreeDto, @User() user: any) {
    return this.systemMenuService.findMenuByRole(user.roles);
  }

  @ApiOperation({ summary: '根据 id 获取系统菜单' })
  @SkipJwt()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemMenuService.findOne(+id);
  }

  @ApiOperation({ summary: '根据 id 更新系统菜单' })
  @SkipJwt()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSystemMenuDto: UpdateSystemMenuDto) {
    return this.systemMenuService.update(+id, updateSystemMenuDto);
  }

  @ApiOperation({ summary: '根据 id 删除系统菜单' })
  @SkipJwt()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemMenuService.remove(+id);
  }
}
