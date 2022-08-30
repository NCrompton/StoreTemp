import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface IDMapAttributes {
  cityu_id: string;
  eid: string;
  email: string;
  uid: string;
  gp?: string;
  e_name: string;
  created_date: string;
  modified_date: string;
  db_access_user: string;
  timestamp: Date;
  rhost: string;
}

export type IDMapOptionalAttributes = "gp" | "created_date" | "modified_date" | "db_access_user" | "rhost";
export type IDMapCreationAttributes = Optional<IDMapAttributes, IDMapOptionalAttributes>;

export class IDMap extends Model<IDMapAttributes, IDMapCreationAttributes> implements IDMapAttributes {
  cityu_id!: string;
  eid!: string;
  email!: string;
  uid!: string;
  gp?: string;
  e_name!: string;
  created_date!: string;
  modified_date!: string;
  db_access_user!: string;
  timestamp!: Date;
  rhost!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof IDMap {
    return IDMap.init({
    cityu_id: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    eid: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    gp: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    e_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    created_date: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    modified_date: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    db_access_user: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('suser_sname')
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    },
    rhost: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('host_name')
    }
  }, {
    sequelize,
    tableName: 'IDMap',
    schema: 'dbo',
    timestamps: false
  });
  }
}
