import { Column, ForeignKey, Table, Model } from 'sequelize-typescript';

import { User } from '@nx-test/shared-models';
import { Role } from '@nx-test/shared-models';

@Table({
  underscored: true,
  paranoid: true,
})
export class UserRole extends Model {
  @ForeignKey(() => User)
  @Column
  user_id!: number;

  @ForeignKey(() => Role)
  @Column
  role_id!: number;
}
