import {
  AutoIncrement,
  BelongsTo,
  ForeignKey,
  PrimaryKey,
} from 'sequelize-typescript';
import { database } from '@nx-test/db-config';
import {
  Model,
  DataType,
  Column,
  AllowNull,
  Table,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import { Shop } from './shop.model';

@Table({
  underscored: true,
  paranoid: true,
})
export class Product extends Model {
  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  cost!: number;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  is_sold!: boolean;

  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Shop)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  shop_id!: number;

  @CreatedAt
  readonly created_at!: Date;

  @UpdatedAt
  readonly updated_at!: Date;

  @DeletedAt
  readonly deleted_at!: Date;

  @BelongsTo(() => Shop, 'shop_id')
  shop!: Shop;
}
