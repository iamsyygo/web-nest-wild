import { Module } from '@nestjs/common';
import { SystemRoleService } from './system-role.service';
import { SystemRoleController } from './system-role.controller';
import { SystemRole } from './entities/system-role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SystemRole])],
  controllers: [SystemRoleController],
  providers: [SystemRoleService],
  exports: [SystemRoleService],
})
export class SystemRoleModule {}
