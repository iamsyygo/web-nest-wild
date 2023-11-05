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
    return `This action returns a #${id} systemRole`;
  }

  update(id: number, updateSystemRoleDto: UpdateSystemRoleDto) {
    return `This action updates a #${id} systemRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} systemRole`;
  }
}
