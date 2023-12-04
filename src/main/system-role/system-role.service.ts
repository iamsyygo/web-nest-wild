import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSystemRoleDto } from './dto/create-system-role.dto';
import { UpdateSystemRoleDto } from './dto/update-system-role.dto';
import { SystemRole } from './entities/system-role.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SystemRoleService {
  @InjectRepository(SystemRole)
  private readonly roleRepository: Repository<SystemRole>;

  async create(dto: CreateSystemRoleDto) {
    const r = await this.roleRepository.findOne({
      where: { name: dto.name },
      // relations: ['permissions'],
    });
    if (r) throw new HttpException('名称已存在', HttpStatus.BAD_REQUEST);

    const result = await this.roleRepository.save(dto);
    return !!result;
  }

  async findByIds(ids: string) {
    const values = ids.split(',');
    const result = await this.roleRepository.find({
      where: { id: In(values) },
      relations: ['permissions'],
    });
    return result;
  }

  findAll() {
    return `This action returns all systemRole`;
  }

  findOne(id: number) {
    return this.roleRepository.findOne({
      where: { id },
      relations: ['permissions', 'menus'],
    });
  }

  update(id: number, dto: UpdateSystemRoleDto) {
    const data = this.roleRepository.findOne({
      where: { id },
    });

    if (!data) return '角色不存在';

    return `This action updates a #${id} systemRole`;
  }

  async remove(id: number) {
    const result = await this.roleRepository.delete(id);

    if (result.affected === 0) return '角色不存在';
    return true;
  }
}
