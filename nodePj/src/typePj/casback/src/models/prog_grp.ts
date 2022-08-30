import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { pg_course_pilo, pg_course_piloId } from './pg_course_pilo';
import type { prog_grp_course, prog_grp_courseId } from './prog_grp_course';
import type { programme, programmeId } from './programme';

export interface prog_grpAttributes {
  prog_grp_id: number;
  programme_id: number;
  desc?: string;
  date_created: Date;
  date_modified: Date;
  seq: number;
  remark?: string;
}

export type prog_grpPk = "prog_grp_id";
export type prog_grpId = prog_grp[prog_grpPk];
export type prog_grpOptionalAttributes = "prog_grp_id" | "desc" | "date_created" | "date_modified" | "seq" | "remark";
export type prog_grpCreationAttributes = Optional<prog_grpAttributes, prog_grpOptionalAttributes>;

export class prog_grp extends Model<prog_grpAttributes, prog_grpCreationAttributes> implements prog_grpAttributes {
  prog_grp_id!: number;
  programme_id!: number;
  desc?: string;
  date_created!: Date;
  date_modified!: Date;
  seq!: number;
  remark?: string;

  // prog_grp hasMany pg_course_pilo via prog_grp_id
  pg_course_pilos!: pg_course_pilo[];
  getPg_course_pilos!: Sequelize.HasManyGetAssociationsMixin<pg_course_pilo>;
  setPg_course_pilos!: Sequelize.HasManySetAssociationsMixin<pg_course_pilo, pg_course_piloId>;
  addPg_course_pilo!: Sequelize.HasManyAddAssociationMixin<pg_course_pilo, pg_course_piloId>;
  addPg_course_pilos!: Sequelize.HasManyAddAssociationsMixin<pg_course_pilo, pg_course_piloId>;
  createPg_course_pilo!: Sequelize.HasManyCreateAssociationMixin<pg_course_pilo>;
  removePg_course_pilo!: Sequelize.HasManyRemoveAssociationMixin<pg_course_pilo, pg_course_piloId>;
  removePg_course_pilos!: Sequelize.HasManyRemoveAssociationsMixin<pg_course_pilo, pg_course_piloId>;
  hasPg_course_pilo!: Sequelize.HasManyHasAssociationMixin<pg_course_pilo, pg_course_piloId>;
  hasPg_course_pilos!: Sequelize.HasManyHasAssociationsMixin<pg_course_pilo, pg_course_piloId>;
  countPg_course_pilos!: Sequelize.HasManyCountAssociationsMixin;
  // prog_grp hasMany prog_grp_course via prog_grp_id
  prog_grp_courses!: prog_grp_course[];
  getProg_grp_courses!: Sequelize.HasManyGetAssociationsMixin<prog_grp_course>;
  setProg_grp_courses!: Sequelize.HasManySetAssociationsMixin<prog_grp_course, prog_grp_courseId>;
  addProg_grp_course!: Sequelize.HasManyAddAssociationMixin<prog_grp_course, prog_grp_courseId>;
  addProg_grp_courses!: Sequelize.HasManyAddAssociationsMixin<prog_grp_course, prog_grp_courseId>;
  createProg_grp_course!: Sequelize.HasManyCreateAssociationMixin<prog_grp_course>;
  removeProg_grp_course!: Sequelize.HasManyRemoveAssociationMixin<prog_grp_course, prog_grp_courseId>;
  removeProg_grp_courses!: Sequelize.HasManyRemoveAssociationsMixin<prog_grp_course, prog_grp_courseId>;
  hasProg_grp_course!: Sequelize.HasManyHasAssociationMixin<prog_grp_course, prog_grp_courseId>;
  hasProg_grp_courses!: Sequelize.HasManyHasAssociationsMixin<prog_grp_course, prog_grp_courseId>;
  countProg_grp_courses!: Sequelize.HasManyCountAssociationsMixin;
  // prog_grp belongsTo programme via programme_id
  programme!: programme;
  getProgramme!: Sequelize.BelongsToGetAssociationMixin<programme>;
  setProgramme!: Sequelize.BelongsToSetAssociationMixin<programme, programmeId>;
  createProgramme!: Sequelize.BelongsToCreateAssociationMixin<programme>;

  static initModel(sequelize: Sequelize.Sequelize): typeof prog_grp {
    return prog_grp.init({
    prog_grp_id: {
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
    },
    seq: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'prog_grp',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_prog_grp",
        unique: true,
        fields: [
          { name: "prog_grp_id" },
        ]
      },
    ]
  });
  }
}
