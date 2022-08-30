import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { report, reportId } from './report';

export interface accountAttributes {
  account_id: number;
  sso_id: string;
  e_name: string;
  c_name?: string;
  title?: string;
  type: number;
  permission?: string;
  date_created: Date;
  date_modified: Date;
  player_version?: string;
  last_logon?: Date;
  web_logon_name?: string;
  web_logon_host?: string;
  u_name: string;
  r_host: string;
  is_current: boolean;
}

export type accountPk = "account_id";
export type accountId = account[accountPk];
export type accountOptionalAttributes = "account_id" | "c_name" | "title" | "type" | "permission" | "date_created" | "date_modified" | "player_version" | "last_logon" | "web_logon_name" | "web_logon_host" | "u_name" | "r_host" | "is_current";
export type accountCreationAttributes = Optional<accountAttributes, accountOptionalAttributes>;

export class account extends Model<accountAttributes, accountCreationAttributes> implements accountAttributes {
  account_id!: number;
  sso_id!: string;
  e_name!: string;
  c_name?: string;
  title?: string;
  type!: number;
  permission?: string;
  date_created!: Date;
  date_modified!: Date;
  player_version?: string;
  last_logon?: Date;
  web_logon_name?: string;
  web_logon_host?: string;
  u_name!: string;
  r_host!: string;
  is_current!: boolean;

  // account hasMany report via account_id
  reports!: report[];
  getReports!: Sequelize.HasManyGetAssociationsMixin<report>;
  setReports!: Sequelize.HasManySetAssociationsMixin<report, reportId>;
  addReport!: Sequelize.HasManyAddAssociationMixin<report, reportId>;
  addReports!: Sequelize.HasManyAddAssociationsMixin<report, reportId>;
  createReport!: Sequelize.HasManyCreateAssociationMixin<report>;
  removeReport!: Sequelize.HasManyRemoveAssociationMixin<report, reportId>;
  removeReports!: Sequelize.HasManyRemoveAssociationsMixin<report, reportId>;
  hasReport!: Sequelize.HasManyHasAssociationMixin<report, reportId>;
  hasReports!: Sequelize.HasManyHasAssociationsMixin<report, reportId>;
  countReports!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof account {
    return account.init({
    account_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    sso_id: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    e_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    c_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    type: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    permission: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    date_modified: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    player_version: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    last_logon: {
      type: DataTypes.DATE,
      allowNull: true
    },
    web_logon_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    web_logon_host: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    u_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('suser_sname')
    },
    r_host: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('host_name')
    },
    is_current: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'account',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_account",
        unique: true,
        fields: [
          { name: "account_id" },
        ]
      },
    ]
  });
  }
}
