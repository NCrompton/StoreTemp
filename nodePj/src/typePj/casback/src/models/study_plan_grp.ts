import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { study_plan, study_planId } from './study_plan';

export interface study_plan_grpAttributes {
  study_plan_grp_id: number;
  study_plan_id: number;
  semester_id: number;
  title: string;
  desc: string;
  credit_min: number;
  credit_max?: number;
  remark?: string;
  date_created: Date;
  date_modified: Date;
}

export type study_plan_grpPk = "study_plan_grp_id";
export type study_plan_grpId = study_plan_grp[study_plan_grpPk];
export type study_plan_grpOptionalAttributes = "study_plan_grp_id" | "credit_min" | "credit_max" | "remark" | "date_created" | "date_modified";
export type study_plan_grpCreationAttributes = Optional<study_plan_grpAttributes, study_plan_grpOptionalAttributes>;

export class study_plan_grp extends Model<study_plan_grpAttributes, study_plan_grpCreationAttributes> implements study_plan_grpAttributes {
  study_plan_grp_id!: number;
  study_plan_id!: number;
  semester_id!: number;
  title!: string;
  desc!: string;
  credit_min!: number;
  credit_max?: number;
  remark?: string;
  date_created!: Date;
  date_modified!: Date;

  // study_plan_grp belongsTo study_plan via study_plan_id
  study_plan!: study_plan;
  getStudy_plan!: Sequelize.BelongsToGetAssociationMixin<study_plan>;
  setStudy_plan!: Sequelize.BelongsToSetAssociationMixin<study_plan, study_planId>;
  createStudy_plan!: Sequelize.BelongsToCreateAssociationMixin<study_plan>;

  static initModel(sequelize: Sequelize.Sequelize): typeof study_plan_grp {
    return study_plan_grp.init({
    study_plan_grp_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    study_plan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'study_plan',
        key: 'study_plan_id'
      }
    },
    semester_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    credit_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    credit_max: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    remark: {
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
    }
  }, {
    sequelize,
    tableName: 'study_plan_grp',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_study_plan_grp",
        unique: true,
        fields: [
          { name: "study_plan_grp_id" },
        ]
      },
    ]
  });
  }
}
