import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemPermission } from './entities/system-permission.entity';
import { SystemPermissionController } from './system-permission.controller';
import { SystemPermissionService } from './system-permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([SystemPermission])],
  controllers: [SystemPermissionController],
  providers: [SystemPermissionService],
  exports: [SystemPermissionService],
})
export class SystemPermissionModule {}
