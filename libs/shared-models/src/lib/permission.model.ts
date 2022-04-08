/* eslint-disable import/no-cycle */
import {
  Model,
  DataType,
  Column,
  AllowNull,
  Unique,
  Table,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ForeignKey,
} from 'sequelize-typescript';

import { Role } from '@nx-test/shared-models';

@Table({
  underscored: true,
  paranoid: true,
})
export class Permission extends Model {
  @AllowNull(false)
  @Unique(true)
  @Column(DataType.STRING)
  @ForeignKey(() => Role)
  name!: string;

  @AllowNull(false)
  @Unique(true)
  @Column(DataType.STRING)
  description!: string;

  @CreatedAt
  readonly createdAt!: Date;

  @UpdatedAt
  readonly updatedAt!: Date;

  @DeletedAt
  readonly deletedAt!: Date;
}
