import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { pilo, piloId } from './pilo';
import type { prog_course_offer, prog_course_offerId } from './prog_course_offer';
import type { prog_grp, prog_grpId } from './prog_grp';
import type { prog_staff, prog_staffId } from './prog_staff';
import type { study_plan, study_planId } from './study_plan';

export interface programmeAttributes {
  programme_id: number;
  name?: string;
  award_title?: string;
  code?: string;
  alias?: string;
  dept?: string;
  mode?: string;
  fund_mode?: string;
  cohort?: string;
  intake?: string;
  date_created: Date;
  date_modified: Date;
  web_logon_name?: string;
  web_logon_host?: string;
  u_name: string;
  r_host: string;
}

export type programmePk = "programme_id";
export type programmeId = programme[programmePk];
export type programmeOptionalAttributes = "programme_id" | "name" | "award_title" | "code" | "alias" | "dept" | "mode" | "fund_mode" | "cohort" | "intake" | "date_created" | "date_modified" | "web_logon_name" | "web_logon_host" | "u_name" | "r_host";
export type programmeCreationAttributes = Optional<programmeAttributes, programmeOptionalAttributes>;

export class programme extends Model<programmeAttributes, programmeCreationAttributes> implements programmeAttributes {
  programme_id!: number;
  name?: string;
  award_title?: string;
  code?: string;
  alias?: string;
  dept?: string;
  mode?: string;
  fund_mode?: string;
  cohort?: string;
  intake?: string;
  date_created!: Date;
  date_modified!: Date;
  web_logon_name?: string;
  web_logon_host?: string;
  u_name!: string;
  r_host!: string;

  // programme hasMany pilo via programme_id
  pilos!: pilo[];
  getPilos!: Sequelize.HasManyGetAssociationsMixin<pilo>;
  setPilos!: Sequelize.HasManySetAssociationsMixin<pilo, piloId>;
  addPilo!: Sequelize.HasManyAddAssociationMixin<pilo, piloId>;
  addPilos!: Sequelize.HasManyAddAssociationsMixin<pilo, piloId>;
  createPilo!: Sequelize.HasManyCreateAssociationMixin<pilo>;
  removePilo!: Sequelize.HasManyRemoveAssociationMixin<pilo, piloId>;
  removePilos!: Sequelize.HasManyRemoveAssociationsMixin<pilo, piloId>;
  hasPilo!: Sequelize.HasManyHasAssociationMixin<pilo, piloId>;
  hasPilos!: Sequelize.HasManyHasAssociationsMixin<pilo, piloId>;
  countPilos!: Sequelize.HasManyCountAssociationsMixin;
  // programme hasMany prog_course_offer via programme_id
  prog_course_offers!: prog_course_offer[];
  getProg_course_offers!: Sequelize.HasManyGetAssociationsMixin<prog_course_offer>;
  setProg_course_offers!: Sequelize.HasManySetAssociationsMixin<prog_course_offer, prog_course_offerId>;
  addProg_course_offer!: Sequelize.HasManyAddAssociationMixin<prog_course_offer, prog_course_offerId>;
  addProg_course_offers!: Sequelize.HasManyAddAssociationsMixin<prog_course_offer, prog_course_offerId>;
  createProg_course_offer!: Sequelize.HasManyCreateAssociationMixin<prog_course_offer>;
  removeProg_course_offer!: Sequelize.HasManyRemoveAssociationMixin<prog_course_offer, prog_course_offerId>;
  removeProg_course_offers!: Sequelize.HasManyRemoveAssociationsMixin<prog_course_offer, prog_course_offerId>;
  hasProg_course_offer!: Sequelize.HasManyHasAssociationMixin<prog_course_offer, prog_course_offerId>;
  hasProg_course_offers!: Sequelize.HasManyHasAssociationsMixin<prog_course_offer, prog_course_offerId>;
  countProg_course_offers!: Sequelize.HasManyCountAssociationsMixin;
  // programme hasMany prog_grp via programme_id
  prog_grps!: prog_grp[];
  getProg_grps!: Sequelize.HasManyGetAssociationsMixin<prog_grp>;
  setProg_grps!: Sequelize.HasManySetAssociationsMixin<prog_grp, prog_grpId>;
  addProg_grp!: Sequelize.HasManyAddAssociationMixin<prog_grp, prog_grpId>;
  addProg_grps!: Sequelize.HasManyAddAssociationsMixin<prog_grp, prog_grpId>;
  createProg_grp!: Sequelize.HasManyCreateAssociationMixin<prog_grp>;
  removeProg_grp!: Sequelize.HasManyRemoveAssociationMixin<prog_grp, prog_grpId>;
  removeProg_grps!: Sequelize.HasManyRemoveAssociationsMixin<prog_grp, prog_grpId>;
  hasProg_grp!: Sequelize.HasManyHasAssociationMixin<prog_grp, prog_grpId>;
  hasProg_grps!: Sequelize.HasManyHasAssociationsMixin<prog_grp, prog_grpId>;
  countProg_grps!: Sequelize.HasManyCountAssociationsMixin;
  // programme hasMany prog_staff via programme_id
  prog_staffs!: prog_staff[];
  getProg_staffs!: Sequelize.HasManyGetAssociationsMixin<prog_staff>;
  setProg_staffs!: Sequelize.HasManySetAssociationsMixin<prog_staff, prog_staffId>;
  addProg_staff!: Sequelize.HasManyAddAssociationMixin<prog_staff, prog_staffId>;
  addProg_staffs!: Sequelize.HasManyAddAssociationsMixin<prog_staff, prog_staffId>;
  createProg_staff!: Sequelize.HasManyCreateAssociationMixin<prog_staff>;
  removeProg_staff!: Sequelize.HasManyRemoveAssociationMixin<prog_staff, prog_staffId>;
  removeProg_staffs!: Sequelize.HasManyRemoveAssociationsMixin<prog_staff, prog_staffId>;
  hasProg_staff!: Sequelize.HasManyHasAssociationMixin<prog_staff, prog_staffId>;
  hasProg_staffs!: Sequelize.HasManyHasAssociationsMixin<prog_staff, prog_staffId>;
  countProg_staffs!: Sequelize.HasManyCountAssociationsMixin;
  // programme hasMany study_plan via programme_id
  study_plans!: study_plan[];
  getStudy_plans!: Sequelize.HasManyGetAssociationsMixin<study_plan>;
  setStudy_plans!: Sequelize.HasManySetAssociationsMixin<study_plan, study_planId>;
  addStudy_plan!: Sequelize.HasManyAddAssociationMixin<study_plan, study_planId>;
  addStudy_plans!: Sequelize.HasManyAddAssociationsMixin<study_plan, study_planId>;
  createStudy_plan!: Sequelize.HasManyCreateAssociationMixin<study_plan>;
  removeStudy_plan!: Sequelize.HasManyRemoveAssociationMixin<study_plan, study_planId>;
  removeStudy_plans!: Sequelize.HasManyRemoveAssociationsMixin<study_plan, study_planId>;
  hasStudy_plan!: Sequelize.HasManyHasAssociationMixin<study_plan, study_planId>;
  hasStudy_plans!: Sequelize.HasManyHasAssociationsMixin<study_plan, study_planId>;
  countStudy_plans!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof programme {
    return programme.init({
    programme_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    award_title: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    code: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    alias: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    dept: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    mode: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    fund_mode: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    cohort: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    intake: {
      type: DataTypes.STRING(50),
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
    }
  }, {
    sequelize,
    tableName: 'programme',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_programme",
        unique: true,
        fields: [
          { name: "programme_id" },
        ]
      },
      {
        name: "UK_code_cohort",
        unique: true,
        fields: [
          { name: "code" },
          { name: "cohort" },
        ]
      },
    ]
  });
  }
}
