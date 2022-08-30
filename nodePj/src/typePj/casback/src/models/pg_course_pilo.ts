import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { course, courseId } from './course';
import type { pilo, piloId } from './pilo';
import type { prog_grp, prog_grpId } from './prog_grp';

export interface pg_course_piloAttributes {
  course_id: number;
  pilo_id: number;
  prog_grp_id: number;
  date_created: Date;
  date_modified: Date;
  type: string;
}

export type pg_course_piloPk = "course_id" | "pilo_id" | "prog_grp_id";
export type pg_course_piloId = pg_course_pilo[pg_course_piloPk];
export type pg_course_piloOptionalAttributes = "date_created" | "date_modified" | "type";
export type pg_course_piloCreationAttributes = Optional<pg_course_piloAttributes, pg_course_piloOptionalAttributes>;

export class pg_course_pilo extends Model<pg_course_piloAttributes, pg_course_piloCreationAttributes> implements pg_course_piloAttributes {
  course_id!: number;
  pilo_id!: number;
  prog_grp_id!: number;
  date_created!: Date;
  date_modified!: Date;
  type!: string;

  // pg_course_pilo belongsTo course via course_id
  course!: course;
  getCourse!: Sequelize.BelongsToGetAssociationMixin<course>;
  setCourse!: Sequelize.BelongsToSetAssociationMixin<course, courseId>;
  createCourse!: Sequelize.BelongsToCreateAssociationMixin<course>;
  // pg_course_pilo belongsTo pilo via pilo_id
  pilo!: pilo;
  getPilo!: Sequelize.BelongsToGetAssociationMixin<pilo>;
  setPilo!: Sequelize.BelongsToSetAssociationMixin<pilo, piloId>;
  createPilo!: Sequelize.BelongsToCreateAssociationMixin<pilo>;
  // pg_course_pilo belongsTo prog_grp via prog_grp_id
  prog_grp!: prog_grp;
  getProg_grp!: Sequelize.BelongsToGetAssociationMixin<prog_grp>;
  setProg_grp!: Sequelize.BelongsToSetAssociationMixin<prog_grp, prog_grpId>;
  createProg_grp!: Sequelize.BelongsToCreateAssociationMixin<prog_grp>;

  static initModel(sequelize: Sequelize.Sequelize): typeof pg_course_pilo {
    return pg_course_pilo.init({
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'course',
        key: 'course_id'
      }
    },
    pilo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'pilo',
        key: 'pilo_id'
      }
    },
    prog_grp_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'prog_grp',
        key: 'prog_grp_id'
      }
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
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "T,P,M,X,X,X,X,X,X"
    }
  }, {
    sequelize,
    tableName: 'pg_course_pilo',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_pg_course_pilo",
        unique: true,
        fields: [
          { name: "course_id" },
          { name: "pilo_id" },
          { name: "prog_grp_id" },
        ]
      },
    ]
  });
  }
}
