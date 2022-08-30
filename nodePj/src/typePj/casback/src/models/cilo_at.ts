import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { cilo, ciloId } from './cilo';
import type { course_at, course_atId } from './course_at';

export interface cilo_atAttributes {
  cilo_id: number;
  course_at_id: number;
}

export type cilo_atPk = "cilo_id" | "course_at_id";
export type cilo_atId = cilo_at[cilo_atPk];
export type cilo_atCreationAttributes = cilo_atAttributes;

export class cilo_at extends Model<cilo_atAttributes, cilo_atCreationAttributes> implements cilo_atAttributes {
  cilo_id!: number;
  course_at_id!: number;

  // cilo_at belongsTo cilo via cilo_id
  cilo!: cilo;
  getCilo!: Sequelize.BelongsToGetAssociationMixin<cilo>;
  setCilo!: Sequelize.BelongsToSetAssociationMixin<cilo, ciloId>;
  createCilo!: Sequelize.BelongsToCreateAssociationMixin<cilo>;
  // cilo_at belongsTo course_at via course_at_id
  course_at!: course_at;
  getCourse_at!: Sequelize.BelongsToGetAssociationMixin<course_at>;
  setCourse_at!: Sequelize.BelongsToSetAssociationMixin<course_at, course_atId>;
  createCourse_at!: Sequelize.BelongsToCreateAssociationMixin<course_at>;

  static initModel(sequelize: Sequelize.Sequelize): typeof cilo_at {
    return cilo_at.init({
    cilo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'cilo',
        key: 'cilo_id'
      }
    },
    course_at_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'course_at',
        key: 'course_at_id'
      }
    }
  }, {
    sequelize,
    tableName: 'cilo_at',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_cilo_at",
        unique: true,
        fields: [
          { name: "cilo_id" },
          { name: "course_at_id" },
        ]
      },
    ]
  });
  }
}
