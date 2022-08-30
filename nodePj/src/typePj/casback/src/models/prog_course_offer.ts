import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { course, courseId } from './course';
import type { programme, programmeId } from './programme';

export interface prog_course_offerAttributes {
  prog_course_offer_id: number;
  programme_id: number;
  course_id: number;
  code_remark?: string;
  title_remark?: string;
  unit_remark?: string;
  prerequisite_remark?: string;
  precursor_remark?: string;
  equivalent_remark?: string;
  equivalent_old_remark?: string;
  exclusive_remark?: string;
  offered_sem?: string;
  remark?: string;
  date_created: Date;
  date_modified: Date;
  web_logon_name?: string;
  web_logon_host?: string;
  u_name: string;
  r_host: string;
  timestamp: Date;
  is_show_exclusive_with_title: boolean;
}

export type prog_course_offerPk = "prog_course_offer_id";
export type prog_course_offerId = prog_course_offer[prog_course_offerPk];
export type prog_course_offerOptionalAttributes = "prog_course_offer_id" | "code_remark" | "title_remark" | "unit_remark" | "prerequisite_remark" | "precursor_remark" | "equivalent_remark" | "equivalent_old_remark" | "exclusive_remark" | "offered_sem" | "remark" | "date_created" | "date_modified" | "web_logon_name" | "web_logon_host" | "u_name" | "r_host" | "is_show_exclusive_with_title";
export type prog_course_offerCreationAttributes = Optional<prog_course_offerAttributes, prog_course_offerOptionalAttributes>;

export class prog_course_offer extends Model<prog_course_offerAttributes, prog_course_offerCreationAttributes> implements prog_course_offerAttributes {
  prog_course_offer_id!: number;
  programme_id!: number;
  course_id!: number;
  code_remark?: string;
  title_remark?: string;
  unit_remark?: string;
  prerequisite_remark?: string;
  precursor_remark?: string;
  equivalent_remark?: string;
  equivalent_old_remark?: string;
  exclusive_remark?: string;
  offered_sem?: string;
  remark?: string;
  date_created!: Date;
  date_modified!: Date;
  web_logon_name?: string;
  web_logon_host?: string;
  u_name!: string;
  r_host!: string;
  timestamp!: Date;
  is_show_exclusive_with_title!: boolean;

  // prog_course_offer belongsTo course via course_id
  course!: course;
  getCourse!: Sequelize.BelongsToGetAssociationMixin<course>;
  setCourse!: Sequelize.BelongsToSetAssociationMixin<course, courseId>;
  createCourse!: Sequelize.BelongsToCreateAssociationMixin<course>;
  // prog_course_offer belongsTo programme via programme_id
  programme!: programme;
  getProgramme!: Sequelize.BelongsToGetAssociationMixin<programme>;
  setProgramme!: Sequelize.BelongsToSetAssociationMixin<programme, programmeId>;
  createProgramme!: Sequelize.BelongsToCreateAssociationMixin<programme>;

  static initModel(sequelize: Sequelize.Sequelize): typeof prog_course_offer {
    return prog_course_offer.init({
    prog_course_offer_id: {
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
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'course',
        key: 'course_id'
      }
    },
    code_remark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    title_remark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    unit_remark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    prerequisite_remark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    precursor_remark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    equivalent_remark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    equivalent_old_remark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    exclusive_remark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    offered_sem: {
      type: DataTypes.TEXT,
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
    },
    web_logon_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    web_logon_host: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    u_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('suser_sname')
    },
    r_host: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('host_name')
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    },
    is_show_exclusive_with_title: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'prog_course_offer',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_prog_course_offer",
        unique: true,
        fields: [
          { name: "prog_course_offer_id" },
        ]
      },
    ]
  });
  }
}
