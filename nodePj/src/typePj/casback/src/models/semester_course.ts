import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { course_detail, course_detailId } from './course_detail';
import type { semester, semesterId } from './semester';

export interface semester_courseAttributes {
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
}

export type semester_coursePk = "semester_course_id";
export type semester_courseId = semester_course[semester_coursePk];
export type semester_courseOptionalAttributes = "semester_course_id" | "course_detail_id" | "credit" | "capacity" | "c_hr" | "t_hr" | "l_hr" | "s_hr" | "remark" | "is_current" | "date_created" | "date_modified" | "sem_hr" | "sl_hr" | "tutorial" | "staff" | "prog_name" | "prog_repeat" | "prog_stu_num" | "prog_year" | "prog_cohort" | "prog_intake" | "prog_mode" | "prog_dept" | "prog_course_type" | "prog_fund_mode" | "web_logon_name" | "web_logon_host" | "u_name" | "r_host" | "code" | "name";
export type semester_courseCreationAttributes = Optional<semester_courseAttributes, semester_courseOptionalAttributes>;

export class semester_course extends Model<semester_courseAttributes, semester_courseCreationAttributes> implements semester_courseAttributes {
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

  // semester_course belongsTo course_detail via course_detail_id
  course_detail!: course_detail;
  getCourse_detail!: Sequelize.BelongsToGetAssociationMixin<course_detail>;
  setCourse_detail!: Sequelize.BelongsToSetAssociationMixin<course_detail, course_detailId>;
  createCourse_detail!: Sequelize.BelongsToCreateAssociationMixin<course_detail>;
  // semester_course belongsTo semester via semester_id
  semester!: semester;
  getSemester!: Sequelize.BelongsToGetAssociationMixin<semester>;
  setSemester!: Sequelize.BelongsToSetAssociationMixin<semester, semesterId>;
  createSemester!: Sequelize.BelongsToCreateAssociationMixin<semester>;

  static initModel(sequelize: Sequelize.Sequelize): typeof semester_course {
    return semester_course.init({
    semester_course_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    course_detail_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'course_detail',
        key: 'course_detail_id'
      }
    },
    semester_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'semester',
        key: 'semester_id'
      }
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
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    date_modified: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
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
      allowNull: false,
      defaultValue: false
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
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('suser_sname')
    },
    r_host: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('host_name')
    },
    code: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'semester_course',
    schema: 'dbo',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PK_semester_course",
        unique: true,
        fields: [
          { name: "semester_course_id" },
        ]
      },
    ]
  });
  }
}
