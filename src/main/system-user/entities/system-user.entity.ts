import { YAML_DATA } from '@/config/js-yaml';
import { SystemRole } from '@/main/system-role/entities/system-role.entity';
import { hashSync } from 'bcryptjs';

import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SystemUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '用户名' })
  username: string;

  @Column({ comment: '密码' })
  password: string;

  @BeforeInsert()
  async encryptPassword() {
    if (!this.password) return;
    this.password = await hashSync(this.password, YAML_DATA.bcrypt.salt);
  }

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

  @ManyToMany(() => SystemRole)
  @JoinTable({
    name: 'user_role_relation',
  })
  roles: SystemRole[];
}
