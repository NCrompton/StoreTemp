import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { account, accountId } from './account';

export interface reportAttributes {
  report_id: number;
  account_id?: number;
  title?: string;
  desc?: string;
  password?: string;
  date_created: Date;
  date_modified: Date;
  fields?: string;
  criteria?: string;
  view?: string;
  is_share: boolean;
  type: number;
}

export type reportPk = "report_id";
export type reportId = report[reportPk];
export type reportOptionalAttributes = "report_id" | "account_id" | "title" | "desc" | "password" | "date_created" | "date_modified" | "fields" | "criteria" | "view" | "is_share" | "type";
export type reportCreationAttributes = Optional<reportAttributes, reportOptionalAttributes>;

export class report extends Model<reportAttributes, reportCreationAttributes> implements reportAttributes {
  report_id!: number;
  account_id?: number;
  title?: string;
  desc?: string;
  password?: string;
  date_created!: Date;
  date_modified!: Date;
  fields?: string;
  criteria?: string;
  view?: string;
  is_share!: boolean;
  type!: number;

  // report belongsTo account via account_id
  account!: account;
  getAccount!: Sequelize.BelongsToGetAssociationMixin<account>;
  setAccount!: Sequelize.BelongsToSetAssociationMixin<account, accountId>;
  createAccount!: Sequelize.BelongsToCreateAssociationMixin<account>;

  static initModel(sequelize: Sequelize.Sequelize): typeof report {
    return report.init({
    report_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'account',
        key: 'account_id'
      }
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(256),
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
    fields: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    criteria: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    view: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    is_share: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'report',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_report",
        unique: true,
        fields: [
          { name: "report_id" },
        ]
      },
    ]
  });
  }
}
