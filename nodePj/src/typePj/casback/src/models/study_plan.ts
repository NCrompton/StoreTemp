import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { programme, programmeId } from './programme';
import type { study_plan_grp, study_plan_grpId } from './study_plan_grp';

export interface study_planAttributes {
  study_plan_id: number;
  programme_id: number;
  title?: string;
  desc?: string;
  date_created: Date;
  date_modified: Date;
}

export type study_planPk = "study_plan_id";
export type study_planId = study_plan[study_planPk];
export type study_planOptionalAttributes = "study_plan_id" | "title" | "desc" | "date_created" | "date_modified";
export type study_planCreationAttributes = Optional<study_planAttributes, study_planOptionalAttributes>;

export class study_plan extends Model<study_planAttributes, study_planCreationAttributes> implements study_planAttributes {
  study_plan_id!: number;
  programme_id!: number;
  title?: string;
  desc?: string;
  date_created!: Date;
  date_modified!: Date;

  // study_plan belongsTo programme via programme_id
  programme!: programme;
  getProgramme!: Sequelize.BelongsToGetAssociationMixin<programme>;
  setProgramme!: Sequelize.BelongsToSetAssociationMixin<programme, programmeId>;
  createProgramme!: Sequelize.BelongsToCreateAssociationMixin<programme>;
  // study_plan hasMany study_plan_grp via study_plan_id
  study_plan_grps!: study_plan_grp[];
  getStudy_plan_grps!: Sequelize.HasManyGetAssociationsMixin<study_plan_grp>;
  setStudy_plan_grps!: Sequelize.HasManySetAssociationsMixin<study_plan_grp, study_plan_grpId>;
  addStudy_plan_grp!: Sequelize.HasManyAddAssociationMixin<study_plan_grp, study_plan_grpId>;
  addStudy_plan_grps!: Sequelize.HasManyAddAssociationsMixin<study_plan_grp, study_plan_grpId>;
  createStudy_plan_grp!: Sequelize.HasManyCreateAssociationMixin<study_plan_grp>;
  removeStudy_plan_grp!: Sequelize.HasManyRemoveAssociationMixin<study_plan_grp, study_plan_grpId>;
  removeStudy_plan_grps!: Sequelize.HasManyRemoveAssociationsMixin<study_plan_grp, study_plan_grpId>;
  hasStudy_plan_grp!: Sequelize.HasManyHasAssociationMixin<study_plan_grp, study_plan_grpId>;
  hasStudy_plan_grps!: Sequelize.HasManyHasAssociationsMixin<study_plan_grp, study_plan_grpId>;
  countStudy_plan_grps!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof study_plan {
    return study_plan.init({
    study_plan_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    programme_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'programme',
        key: 'programme_id'
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
    tableName: 'study_plan',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_stidy_plan",
        unique: true,
        fields: [
          { name: "study_plan_id" },
        ]
      },
    ]
  });
  }
}
