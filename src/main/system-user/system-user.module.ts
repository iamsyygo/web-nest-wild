import JwtModule, { JwtStrategy } from '@/config/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemUser } from './entities/system-user.entity';
import { SystemUserController } from './system-user.controller';
import { SystemUserService } from './system-user.service';
import { SystemRoleService } from '../system-role/system-role.service';
import { SystemRole } from '../system-role/entities/system-role.entity';
import { SystemRoleModule } from '../system-role/system-role.module';

@Module({
  imports: [TypeOrmModule.forFeature([SystemUser, SystemRole]), JwtModule, SystemRoleModule],
  controllers: [SystemUserController],
  providers: [SystemUserService, JwtStrategy, SystemRoleService],
  exports: [SystemUserService],
})
export class SystemUserModule {}
