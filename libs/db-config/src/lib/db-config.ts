import { Product } from "@nx-test/shared-models";
import {Sequelize} from 'sequelize-typescript';
import { Shop } from "@nx-test/shared-models";
import { User } from "@nx-test/shared-models";
import { UserRole } from "@nx-test/shared-models";
import { Permission } from "@nx-test/shared-models";
import { Role } from "@nx-test/shared-models";
require('dotenv').config()

export const database = new Sequelize(process.env.DB_NAME!, process.env.DB_USERNAME!, process.env.DB_PASSWORD!, {
	host: 'localhost',
	dialect: 'postgres',
	pool:{
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	}
});

database.addModels([Product, Shop,User,UserRole,Permission, Role])


