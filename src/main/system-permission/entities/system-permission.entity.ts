import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class SystemPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    comment: '权限名称',
  })
  name: string;

  @Column({
    length: 50,
    comment: '权限值',
  })
  value: string;

  @Column({
    length: 100,
    nullable: true,
    comment: '描述',
  })
  desc: string;

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
}
