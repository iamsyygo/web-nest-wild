import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSystemPermissionDto } from './dto/create-system-permission.dto';
import { UpdateSystemPermissionDto } from './dto/update-system-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SystemPermission } from './entities/system-permission.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class SystemPermissionService {
  @InjectRepository(SystemPermission)
  private readonly permissionRepository: Repository<SystemPermission>;

  async create(dto: CreateSystemPermissionDto) {
    const p = await this.permissionRepository.findOne({
      where: { name: dto.name, value: dto.value },
      // relations: ['permissions'],
    });
    if (p) throw new HttpException('名称或值已存在', HttpStatus.BAD_REQUEST);

    const result = await this.permissionRepository.save(dto);
    return !!result;
  }

  async findByIds(ids: string) {
    const values = ids.split(',');
    const result = await this.permissionRepository.find({
      where: { id: In(values) },
    });
    return result;
  }

  async findOneById(id: number) {
    const result = await this.permissionRepository.find({
      where: { id },
    });
    return result;
  }

  update(id: number, updateSystemPermissionDto: UpdateSystemPermissionDto) {
    return `This action updates a #${id} systemPermission`;
  }

  remove(id: number) {
    return `This action removes a #${id} systemPermission`;
  }
}
