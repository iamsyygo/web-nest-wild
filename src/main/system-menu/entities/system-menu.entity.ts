import { SystemPermission } from '@/main/system-permission/entities/system-permission.entity';
import { SystemRole } from '@/main/system-role/entities/system-role.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('system_menu')
export class SystemMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '创建时间',
    update: false,
  })
  createTime: Date;

  @Column({
    type: 'timestamp',
    comment: '修改时间',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true,
    transformer: { from: (value: Date) => value, to: () => new Date() },
  })
  updateTime: Date;

  @Column({
    type: 'enum',
    comment: '软删除',
    default: DeleteStatus.TRUE,
    enum: [DeleteStatus.TRUE, DeleteStatus.FALSE],
    select: false,
  })
  isDelete: DeleteStatus;

  @Column({ comment: '菜单名称' })
  name: string;

  @Column({ comment: '菜单编码(路由)' })
  path: string;

  @Column({ comment: '菜单层级', default: 1 })
  level: number;

  @Column({ comment: '菜单所属菜单', nullable: true, type: 'varchar' })
  parentId: number;

  @Column({ comment: '菜单描述', nullable: true })
  description: string;

  @Column({ comment: '排序', nullable: true })
  sort: number;

  @Column({ comment: '状态：1启用；0禁用', default: 1 })
  status: number;

  @Column({ comment: '菜单图标', nullable: true })
  icon: string;

  //   @Column({ comment: '菜单类型：1菜单、2按钮', default: 1 })
  //   type: number;

  //   @Column({ comment: '权限: 1所有权限、2系统权限、3自定义权限', default: 1 })
  //   permission: string;

  //   @OneToMany(() => SystemPermission, (SystemPermission) => SystemPermission)
  //   permission: SystemPermission[];

  @ManyToMany(() => SystemRole, (SystemRole) => SystemRole)
  @JoinTable({
    name: 'menu_role_relation',
  })
  roles: SystemRole[];

  @ManyToOne(() => SystemMenu, (SystemMenu) => SystemMenu.children, {
    onDelete: 'CASCADE', // 级联删除
    createForeignKeyConstraints: true, // 取消外键约束
  })
  parent: SystemMenu;

  @OneToMany(() => SystemMenu, (SystemMenu) => SystemMenu.parent)
  children: SystemMenu[];
}
