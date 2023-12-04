import { Injectable } from '@nestjs/common';
import { CreateSystemMenuDto } from './dto/create-system-menu.dto';
import { UpdateSystemMenuDto } from './dto/update-system-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SystemMenu } from './entities/system-menu.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { SystemRoleService } from '../system-role/system-role.service';
import { SystemRole } from '../system-role/entities/system-role.entity';
import { QuerySystemMenuTreeDto } from './dto/query-system-menu.dto';

@Injectable()
export class SystemMenuService {
  constructor(
    @InjectRepository(SystemMenu)
    private menuRepository: Repository<SystemMenu>,
    @InjectRepository(SystemRole)
    private roleRepository: Repository<SystemRole>,
  ) {}

  async createMenu(createSystemMenuDto: CreateSystemMenuDto) {
    const { roleIds } = createSystemMenuDto;
    const roles = await this.roleRepository.findByIds(roleIds.split(','));

    const entities = plainToClass(SystemMenu, {
      ...createSystemMenuDto,
      roles,
    });
    return this.menuRepository.save(entities);
  }

  async findMenuByRole(ids: number[]) {
    if (!ids?.length) return [];

    const queryBuilder = this.menuRepository.createQueryBuilder('menu');

    // 根据多个角色 id 获取菜单列表
    const menus = await queryBuilder
      .innerJoinAndSelect('menu.roles', 'role', 'role.id IN (:...roleIds)', { roleIds: ids })
      .addOrderBy('menu.parentId, menu.sort', 'ASC') // 按照 parentId 和 order 排序
      // 排除一些字段返回
      .select(['menu.id', 'menu.parentId', 'menu.name', 'menu.path', 'menu.icon'])
      .getMany();

    return this.buildMenuTree(menus);
  }

  findOne(id: number) {
    return this.menuRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
  }

  async update(id: number, dto: UpdateSystemMenuDto) {
    const hasMenu = await this.menuRepository.findOne({
      where: { id },
    });
    console.log(hasMenu);

    if (!hasMenu) {
      return '菜单不存在';
    }

    const { roleIds } = dto;
    const roles = await this.roleRepository.findByIds(roleIds.split(','));

    if (!roles.length) return '角色不存在';

    const entities = plainToClass(SystemMenu, {
      ...dto,
      roles,
    });
    return this.menuRepository.save(entities);
  }

  async remove(id: number) {
    const result = await this.menuRepository.delete(id);
    if (result.affected === 0) return '菜单不存在';

    return true;
  }

  // 递归构建菜单树
  private buildMenuTree(menus: SystemMenu[]) {
    const menuMap = new Map<number, SystemMenu>();
    const pathMaps: Record<string, SystemMenu> = {};
    const menuTree: SystemMenu[] = [];

    for (const menu of menus) {
      delete menu.roles;
      menuMap.set(menu.id, menu);
      pathMaps[menu.path] = menu;

      const parentMenu = menuMap.get(menu.parentId);
      if (parentMenu) {
        parentMenu.children ??= [];
        parentMenu.children.push(menu);
      } else {
        menuTree.push(menu);
      }
    }
    return {
      menus: menuTree,
      pathMaps,
    };
  }
}
