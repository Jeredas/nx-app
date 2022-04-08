import { Optional } from 'sequelize';

export interface IRoleAttributes {
  id: number;
  name: string;
}

export type IRoleCreationAttributes = Optional<IRoleAttributes, 'id'>