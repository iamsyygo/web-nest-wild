import { HttpException, Injectable } from '@nestjs/common';
import { CreateSystemUserDto } from './dto/create-system-user.dto';
import { UpdateSystemUserDto } from './dto/update-system-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemUser } from './entities/system-user.entity';
import { plainToClass } from 'class-transformer';
import { SystemUserDto } from './dto/system-user.dto';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { Payload } from './types';
import { SystemRoleService } from '../system-role/system-role.service';
// import { randomUUID } from 'crypto'; // 生成随机字符串

@Injectable()
export class SystemUserService {
  @InjectRepository(SystemUser)
  private readonly userRepository: Repository<SystemUser>;

  constructor(
    private jwtService: JwtService,
    private systemRoleService: SystemRoleService,
  ) {}

  private signToken(payload: Payload) {
    return this.jwtService.sign(payload);
  }

  async create(dto: CreateSystemUserDto) {
    const hasUser = await this.userRepository.findOne({
      where: { username: dto.username },
    });
    if (hasUser) {
      throw new HttpException('用户已存在', 400);
    }
    const data = plainToClass(SystemUser, dto);
    const reslut = await this.userRepository.save(data);
    return !!reslut;
  }

  async login(user: SystemUserDto) {
    const u = await this.userRepository.findOne({
      where: { username: user.username },
      relations: ['roles'],
    });
    if (!u) throw new HttpException('用户不存在', 400);

    const isMatch = await compare(user.password, u.password);
    delete u.password;

    if (!isMatch) throw new HttpException('密码错误', 400);

    const token = this.signToken({
      sub: u.id,
      username: u.username,
      roles: u.roles.map((item) => item.id),
    });
    return {
      user: u,
      authorization: `Bearer ${token}`,
    };
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      select: ['id', 'username', 'roles', 'createTime', 'updateTime', 'createTime', 'id'],
      relations: ['roles'],
      // sql 语法查询非 password 字段
    });
  }

  async update(dto: UpdateSystemUserDto) {
    const relations = await this.systemRoleService.findByIds(dto.roles);
    const value = await this.userRepository.findOne({ where: { id: dto.id } });
    if (!value) throw new HttpException('用户不存在', 400);

    // const data = plainToClass(SystemUser, dto);

    const reslut = await this.userRepository.save({ ...value, roles: relations });
    return !!reslut;
  }

  async remove(id: number) {
    const data = await this.userRepository.delete({ id });
    if (data.affected === 0) throw new HttpException('用户不存在', 400);
    return true;
  }
}
