import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface course_detail_logAttributes {
  course_detail_id: number;
  course_id: number;
  name?: string;
  credit?: number;
  duration?: number;
  level?: string;
  medium?: string;
  cw_percent?: number;
  exam_percent?: number;
  exam_duration?: number;
  precursor?: string;
  prerequisite?: string;
  equivalent?: string;
  exclusive?: string;
  fund_mode?: string;
  cef_course?: boolean;
  block_transfer?: boolean;
  remark?: string;
  version?: number;
  is_current?: number;
  date_created: Date;
  date_modified: Date;
  grade_pattern?: string;
  cohort_from: number;
  cohort_to: number;
  aim?: string;
  grade_remark?: string;
  kw_syllabus?: string;
  syllabus?: string;
  u_name: string;
  r_host: string;
  web_logon_name?: string;
  web_logon_host?: string;
  text_reading?: string;
  online_reading?: string;
  semester_id?: number;
  equivalent_old?: string;
  timestamp?: any;
}

export type course_detail_logOptionalAttributes = "name" | "credit" | "duration" | "level" | "medium" | "cw_percent" | "exam_percent" | "exam_duration" | "precursor" | "prerequisite" | "equivalent" | "exclusive" | "fund_mode" | "cef_course" | "block_transfer" | "remark" | "version" | "is_current" | "grade_pattern" | "aim" | "grade_remark" | "kw_syllabus" | "syllabus" | "web_logon_name" | "web_logon_host" | "text_reading" | "online_reading" | "semester_id" | "equivalent_old" | "timestamp";
export type course_detail_logCreationAttributes = Optional<course_detail_logAttributes, course_detail_logOptionalAttributes>;

export class course_detail_log extends Model<course_detail_logAttributes, course_detail_logCreationAttributes> implements course_detail_logAttributes {
  course_detail_id!: number;
  course_id!: number;
  name?: string;
  credit?: number;
  duration?: number;
  level?: string;
  medium?: string;
  cw_percent?: number;
  exam_percent?: number;
  exam_duration?: number;
  precursor?: string;
  prerequisite?: string;
  equivalent?: string;
  exclusive?: string;
  fund_mode?: string;
  cef_course?: boolean;
  block_transfer?: boolean;
  remark?: string;
  version?: number;
  is_current?: number;
  date_created!: Date;
  date_modified!: Date;
  grade_pattern?: string;
  cohort_from!: number;
  cohort_to!: number;
  aim?: string;
  grade_remark?: string;
  kw_syllabus?: string;
  syllabus?: string;
  u_name!: string;
  r_host!: string;
  web_logon_name?: string;
  web_logon_host?: string;
  text_reading?: string;
  online_reading?: string;
  semester_id?: number;
  equivalent_old?: string;
  timestamp?: any;


  static initModel(sequelize: Sequelize.Sequelize): typeof course_detail_log {
    return course_detail_log.init({
    course_detail_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    credit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    level: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    medium: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    cw_percent: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    exam_percent: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    exam_duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    precursor: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    prerequisite: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    equivalent: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    exclusive: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fund_mode: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    cef_course: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    block_transfer: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    version: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    is_current: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false
    },
    date_modified: {
      type: DataTypes.DATE,
      allowNull: false
    },
    grade_pattern: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    cohort_from: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cohort_to: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    aim: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    grade_remark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    kw_syllabus: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    syllabus: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    u_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    r_host: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    web_logon_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    web_logon_host: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    text_reading: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    online_reading: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    semester_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    equivalent_old: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    timestamp: {
      type: DataTypes.BLOB,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'course_detail_log',
    schema: 'dbo',
    timestamps: false
  });
  }
}
