/* eslint-disable import/no-cycle */
import {
  Model,
  DataType,
  Column,
  AllowNull,
  Unique,
  BelongsToMany,
  Table,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsTo,
  HasMany,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

import { User } from '@nx-test/shared-models';
import { Permission } from '@nx-test/shared-models';
import { IRoleAttributes, IRoleCreationAttributes } from '@nx-test/shared-interfaces';

@Table({
  underscored: true,
  paranoid: true,
})
export class Role 
extends Model<IRoleAttributes,IRoleCreationAttributes>
implements IRoleCreationAttributes
{
  @AllowNull(false)
  @Unique(true)
  @Column(DataType.STRING)
  name!: string;

  
  @PrimaryKey
  @AutoIncrement
  @ForeignKey(()=>User)
  @Column
  id!: number;

  @CreatedAt
  readonly createdAt!: Date;

  @UpdatedAt
  readonly updatedAt!: Date;

  @DeletedAt
  readonly deletedAt!: Date;

  @HasMany(()=> Permission)
  permissions!: Permission[];

  @BelongsTo(()=>User)
  users!: User[];

//   @BelongsTo(() => UserRole,'id')
//   user_roles!: UserRole[];

}
