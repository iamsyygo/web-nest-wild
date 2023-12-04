import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SkipJwt } from '@/decorator/jwt-allowlist.decorator';
import { QrcodeChangeStatusDto } from './dto/qrcode-authentication.dto';

@ApiTags('认证中心')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @SkipJwt()
  @ApiOperation({ summary: '获取登录二维码' })
  @Get('qrcode')
  async getQrcode() {
    return this.authenticationService.getQrcode();
  }

  @SkipJwt()
  @ApiOperation({ summary: '检查二维码状态' })
  @ApiQuery({ name: 'id', description: '二维码 uuid' })
  @Get('qrcode/check')
  async checkQrcode(@Query('id') id: string) {
    return this.authenticationService.checkQrcode(id);
  }

  @SkipJwt()
  @ApiOperation({ summary: '二维码状态修改' })
  @Post('qrcode/status-change')
  async handleQrcodeStatusChange(@Body() body: QrcodeChangeStatusDto) {
    return this.authenticationService.handleQrcodeStatusChange(body);
  }
}
