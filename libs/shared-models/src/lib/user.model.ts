/* eslint-disable import/no-cycle */
import {
	Model,
	DataType,
	Column,
	AllowNull,
	Unique,
	BelongsToMany,
	HasMany,
	Table,
	CreatedAt,
	UpdatedAt,
	DeletedAt,
	Default,
	HasOne,
  } from 'sequelize-typescript';
  import { HasManyGetAssociationsMixin, HasOneGetAssociationMixin } from 'sequelize';
  import { Shop } from '@nx-test/shared-models';
  import { Role } from '@nx-test/shared-models';
  import { UserRole } from '@nx-test/shared-models';
  
  
  
  @Table({
	underscored: true,
	paranoid: true,
  })
  export class User
	extends Model
  {
	@AllowNull(false)
	@Default(DataType.UUIDV4)
	@Column(DataType.UUID)
	uuid!: string;
	
  
	@AllowNull(false)
	@Column(DataType.STRING)
	email!: string;
  
	@AllowNull(false)
	@Unique(true)
	@Column(DataType.STRING)
	google_id!: string;
  
	@AllowNull(false)
	@Column(DataType.STRING)
	first_name!: string;
  
	@Column(DataType.STRING)
	last_name!: string;
  
	@Column(DataType.STRING)
	picture_url!: string;
  
	@Column(DataType.STRING)
	password!:string;
  
	@CreatedAt
	readonly createdAt!: Date;
  
	@UpdatedAt
	readonly updatedAt!: Date;
  
	@DeletedAt
	readonly deletedAt!: Date;
  
	@BelongsToMany(() => Role, ()=>UserRole)
	roles!: Array<Role & {UserRole: UserRole[]}>;
  
	@HasMany(() => Shop)
	shops!: Shop[];
  
	public getShops!: HasManyGetAssociationsMixin<Shop>;
  }
  