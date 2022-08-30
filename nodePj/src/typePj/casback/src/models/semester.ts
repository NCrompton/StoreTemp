import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { semester_course, semester_courseId } from './semester_course';

export interface semesterAttributes {
  semester_id: number;
  start_date?: Date;
  end_date?: Date;
  year: string;
  code?: string;
  date_created: Date;
  date_modified: Date;
}

export type semesterPk = "semester_id";
export type semesterId = semester[semesterPk];
export type semesterOptionalAttributes = "semester_id" | "start_date" | "end_date" | "code" | "date_created" | "date_modified";
export type semesterCreationAttributes = Optional<semesterAttributes, semesterOptionalAttributes>;

export class semester extends Model<semesterAttributes, semesterCreationAttributes> implements semesterAttributes {
  semester_id!: number;
  start_date?: Date;
  end_date?: Date;
  year!: string;
  code?: string;
  date_created!: Date;
  date_modified!: Date;

  // semester hasMany semester_course via semester_id
  semester_courses!: semester_course[];
  getSemester_courses!: Sequelize.HasManyGetAssociationsMixin<semester_course>;
  setSemester_courses!: Sequelize.HasManySetAssociationsMixin<semester_course, semester_courseId>;
  addSemester_course!: Sequelize.HasManyAddAssociationMixin<semester_course, semester_courseId>;
  addSemester_courses!: Sequelize.HasManyAddAssociationsMixin<semester_course, semester_courseId>;
  createSemester_course!: Sequelize.HasManyCreateAssociationMixin<semester_course>;
  removeSemester_course!: Sequelize.HasManyRemoveAssociationMixin<semester_course, semester_courseId>;
  removeSemester_courses!: Sequelize.HasManyRemoveAssociationsMixin<semester_course, semester_courseId>;
  hasSemester_course!: Sequelize.HasManyHasAssociationMixin<semester_course, semester_courseId>;
  hasSemester_courses!: Sequelize.HasManyHasAssociationsMixin<semester_course, semester_courseId>;
  countSemester_courses!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof semester {
    return semester.init({
    semester_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    year: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(5),
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
    tableName: 'semester',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_semester",
        unique: true,
        fields: [
          { name: "semester_id" },
        ]
      },
    ]
  });
  }
}
