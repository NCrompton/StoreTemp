import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { course, courseId } from './course';

export interface course_staffAttributes {
  course_id: number;
  staff_sso_id: string;
}

export type course_staffPk = "course_id" | "staff_sso_id";
export type course_staffId = course_staff[course_staffPk];
export type course_staffCreationAttributes = course_staffAttributes;

export class course_staff extends Model<course_staffAttributes, course_staffCreationAttributes> implements course_staffAttributes {
  course_id!: number;
  staff_sso_id!: string;

  // course_staff belongsTo course via course_id
  course!: course;
  getCourse!: Sequelize.BelongsToGetAssociationMixin<course>;
  setCourse!: Sequelize.BelongsToSetAssociationMixin<course, courseId>;
  createCourse!: Sequelize.BelongsToCreateAssociationMixin<course>;

  static initModel(sequelize: Sequelize.Sequelize): typeof course_staff {
    return course_staff.init({
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'course',
        key: 'course_id'
      }
    },
    staff_sso_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'course_staff',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_course_staff",
        unique: true,
        fields: [
          { name: "course_id" },
          { name: "staff_sso_id" },
        ]
      },
    ]
  });
  }
}
