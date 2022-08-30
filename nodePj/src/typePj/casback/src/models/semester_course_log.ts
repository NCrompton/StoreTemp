import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface semester_course_logAttributes {
  semester_course_id: number;
  course_detail_id?: number;
  semester_id: number;
  credit?: number;
  capacity?: string;
  c_hr?: string;
  t_hr?: string;
  l_hr?: string;
  s_hr?: string;
  remark?: string;
  is_current?: boolean;
  date_created: Date;
  date_modified: Date;
  sem_hr?: string;
  sl_hr?: string;
  tutorial?: string;
  staff?: string;
  prog_name?: string;
  prog_repeat: boolean;
  prog_stu_num?: string;
  prog_year?: string;
  prog_cohort?: string;
  prog_intake?: string;
  prog_mode?: string;
  prog_dept?: string;
  prog_course_type?: string;
  prog_fund_mode?: string;
  web_logon_name?: string;
  web_logon_host?: string;
  u_name: string;
  r_host: string;
  code?: string;
  name?: string;
  action_date: Date;
  action?: string;
}

export type semester_course_logOptionalAttributes = "course_detail_id" | "credit" | "capacity" | "c_hr" | "t_hr" | "l_hr" | "s_hr" | "remark" | "is_current" | "sem_hr" | "sl_hr" | "tutorial" | "staff" | "prog_name" | "prog_stu_num" | "prog_year" | "prog_cohort" | "prog_intake" | "prog_mode" | "prog_dept" | "prog_course_type" | "prog_fund_mode" | "web_logon_name" | "web_logon_host" | "code" | "name" | "action_date" | "action";
export type semester_course_logCreationAttributes = Optional<semester_course_logAttributes, semester_course_logOptionalAttributes>;

export class semester_course_log extends Model<semester_course_logAttributes, semester_course_logCreationAttributes> implements semester_course_logAttributes {
  semester_course_id!: number;
  course_detail_id?: number;
  semester_id!: number;
  credit?: number;
  capacity?: string;
  c_hr?: string;
  t_hr?: string;
  l_hr?: string;
  s_hr?: string;
  remark?: string;
  is_current?: boolean;
  date_created!: Date;
  date_modified!: Date;
  sem_hr?: string;
  sl_hr?: string;
  tutorial?: string;
  staff?: string;
  prog_name?: string;
  prog_repeat!: boolean;
  prog_stu_num?: string;
  prog_year?: string;
  prog_cohort?: string;
  prog_intake?: string;
  prog_mode?: string;
  prog_dept?: string;
  prog_course_type?: string;
  prog_fund_mode?: string;
  web_logon_name?: string;
  web_logon_host?: string;
  u_name!: string;
  r_host!: string;
  code?: string;
  name?: string;
  action_date!: Date;
  action?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof semester_course_log {
    return semester_course_log.init({
    semester_course_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    course_detail_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    semester_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    credit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    capacity: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    c_hr: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    t_hr: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    l_hr: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    s_hr: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_current: {
      type: DataTypes.BOOLEAN,
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
    sem_hr: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    sl_hr: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    tutorial: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    staff: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    prog_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    prog_repeat: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    prog_stu_num: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    prog_year: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    prog_cohort: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    prog_intake: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    prog_mode: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    prog_dept: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    prog_course_type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    prog_fund_mode: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    web_logon_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    web_logon_host: {
      type: DataTypes.STRING(50),
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
    code: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    action_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    action: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'semester_course_log',
    schema: 'dbo',
    timestamps: false
  });
  }
}
