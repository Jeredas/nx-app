import  {
  AutoIncrement,
  BelongsTo,
  ForeignKey,
  PrimaryKey,
} from "sequelize-typescript";
import {
  Model,
  DataType,
  Column,
  AllowNull,
  HasMany,
  Table,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from "sequelize-typescript";
import { Product } from '@nx-test/shared-models';
import { User } from '@nx-test/shared-models';

@Table({
  underscored: true,
  paranoid: true,
})
export class Shop extends Model {
  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @AutoIncrement
  @ForeignKey(()=>User)
  @PrimaryKey
  @Column(DataType.UUID)
  id!: string;

  @Column
  user_id!: number

  @CreatedAt
  readonly created_at!: Date;

  @UpdatedAt
  readonly updated_at!: Date;

  @DeletedAt
  readonly deleted_at!: Date;

  @HasMany(() => Product)
  products!: Product[];

  @BelongsTo(() => User, "user_id")
  user!: User;
}
