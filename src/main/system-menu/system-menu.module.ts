import { Module } from '@nestjs/common';
import { SystemMenuService } from './system-menu.service';
import { SystemMenuController } from './system-menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemMenu } from './entities/system-menu.entity';
import { SystemRoleService } from '../system-role/system-role.service';
import { SystemRoleModule } from '../system-role/system-role.module';
import { SystemRole } from '../system-role/entities/system-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SystemMenu, SystemRole]), SystemRoleModule],
  controllers: [SystemMenuController],
  providers: [SystemMenuService, SystemRoleService],
})
export class SystemMenuModule {}
