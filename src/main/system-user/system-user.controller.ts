import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateSystemUserDto } from './dto/create-system-user.dto';
import { UpdateSystemUserDto } from './dto/update-system-user.dto';
import { SystemUserService } from './system-user.service';
import { SystemUserDto } from './dto/system-user.dto';
import { JwtPermissionGuard } from '@/guard/jwt-permission.guard';
import { SkipJwt } from '@/decorator/jwt-allowlist.decorator';
import { Permission } from '@/decorator/permission.decorator';

@ApiTags('系统用户')
@Controller('system-user')
export class SystemUserController {
  constructor(private readonly systemUserService: SystemUserService) {}

  @ApiOperation({ summary: '创建用户' })
  @Post('create')
  @HttpCode(201)
  @SkipJwt()
  create(@Body() createSystemUserDto: CreateSystemUserDto) {
    return this.systemUserService.create(createSystemUserDto);
  }

  @SkipJwt()
  @ApiOperation({ summary: '登录' })
  @Post('login')
  @HttpCode(200)
  login(@Body() user: SystemUserDto) {
    return this.systemUserService.login(user);
  }

  // @UseGuards(JwtPermissionGuard)
  @SkipJwt()
  @ApiOperation({ summary: '根据 id 查询用户' })
  @Permission('system-user:query')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemUserService.findOne(+id);
  }

  @ApiOperation({ summary: '更新系统用户信息' })
  @SkipJwt()
  @Put('update')
  update(@Body() updateSystemUserDto: UpdateSystemUserDto) {
    return this.systemUserService.update(updateSystemUserDto);
  }

  @ApiOperation({ summary: '根据 id 删除用户' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemUserService.remove(+id);
  }
}
