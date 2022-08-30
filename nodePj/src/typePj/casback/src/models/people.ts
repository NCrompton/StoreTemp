import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface peopleAttributes {
  section_id?: number;
  section_name?: string;
  is_tdshow: boolean;
  title?: string;
  e_name?: string;
  c_name?: string;
  sso_id?: string;
}

export type peopleOptionalAttributes = "section_id" | "section_name" | "title" | "e_name" | "c_name" | "sso_id";
export type peopleCreationAttributes = Optional<peopleAttributes, peopleOptionalAttributes>;

export class people extends Model<peopleAttributes, peopleCreationAttributes> implements peopleAttributes {
  section_id?: number;
  section_name?: string;
  is_tdshow!: boolean;
  title?: string;
  e_name?: string;
  c_name?: string;
  sso_id?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof people {
    return people.init({
    section_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    section_name: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    is_tdshow: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    e_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    c_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    sso_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'people',
    schema: 'dbo',
    timestamps: false
  });
  }
}
