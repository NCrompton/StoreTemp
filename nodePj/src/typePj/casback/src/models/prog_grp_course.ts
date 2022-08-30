import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { course, courseId } from './course';
import type { prog_grp, prog_grpId } from './prog_grp';

export interface prog_grp_courseAttributes {
  prog_grp_course_id: number;
  prog_grp_id: number;
  course_id: number;
  date_created: Date;
  date_modified: Date;
}

export type prog_grp_coursePk = "prog_grp_course_id";
export type prog_grp_courseId = prog_grp_course[prog_grp_coursePk];
export type prog_grp_courseOptionalAttributes = "prog_grp_course_id" | "date_created" | "date_modified";
export type prog_grp_courseCreationAttributes = Optional<prog_grp_courseAttributes, prog_grp_courseOptionalAttributes>;

export class prog_grp_course extends Model<prog_grp_courseAttributes, prog_grp_courseCreationAttributes> implements prog_grp_courseAttributes {
  prog_grp_course_id!: number;
  prog_grp_id!: number;
  course_id!: number;
  date_created!: Date;
  date_modified!: Date;

  // prog_grp_course belongsTo course via course_id
  course!: course;
  getCourse!: Sequelize.BelongsToGetAssociationMixin<course>;
  setCourse!: Sequelize.BelongsToSetAssociationMixin<course, courseId>;
  createCourse!: Sequelize.BelongsToCreateAssociationMixin<course>;
  // prog_grp_course belongsTo prog_grp via prog_grp_id
  prog_grp!: prog_grp;
  getProg_grp!: Sequelize.BelongsToGetAssociationMixin<prog_grp>;
  setProg_grp!: Sequelize.BelongsToSetAssociationMixin<prog_grp, prog_grpId>;
  createProg_grp!: Sequelize.BelongsToCreateAssociationMixin<prog_grp>;

  static initModel(sequelize: Sequelize.Sequelize): typeof prog_grp_course {
    return prog_grp_course.init({
    prog_grp_course_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    prog_grp_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'prog_grp',
        key: 'prog_grp_id'
      },
      unique: "UK_prog_grp_course"
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'course',
        key: 'course_id'
      },
      unique: "UK_prog_grp_course"
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
    tableName: 'prog_grp_course',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_prog_grp_course",
        unique: true,
        fields: [
          { name: "prog_grp_course_id" },
        ]
      },
      {
        name: "UK_prog_grp_course",
        unique: true,
        fields: [
          { name: "prog_grp_id" },
          { name: "course_id" },
        ]
      },
    ]
  });
  }
}
