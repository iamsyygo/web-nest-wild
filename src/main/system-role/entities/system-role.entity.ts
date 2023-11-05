import { SystemPermission } from '@/main/system-permission/entities/system-permission.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SystemRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, comment: '角色名称' })
  name: string;

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
  isDelete: number;

  @ManyToMany(() => SystemPermission)
  @JoinTable({
    name: 'role_permission_relation',
  })
  permissions: SystemPermission[];
}
