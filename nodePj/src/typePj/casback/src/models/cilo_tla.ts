import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { cilo, ciloId } from './cilo';
import type { course_tla, course_tlaId } from './course_tla';

export interface cilo_tlaAttributes {
  cilo_id: number;
  course_tla_id: number;
}

export type cilo_tlaPk = "cilo_id" | "course_tla_id";
export type cilo_tlaId = cilo_tla[cilo_tlaPk];
export type cilo_tlaCreationAttributes = cilo_tlaAttributes;

export class cilo_tla extends Model<cilo_tlaAttributes, cilo_tlaCreationAttributes> implements cilo_tlaAttributes {
  cilo_id!: number;
  course_tla_id!: number;

  // cilo_tla belongsTo cilo via cilo_id
  cilo!: cilo;
  getCilo!: Sequelize.BelongsToGetAssociationMixin<cilo>;
  setCilo!: Sequelize.BelongsToSetAssociationMixin<cilo, ciloId>;
  createCilo!: Sequelize.BelongsToCreateAssociationMixin<cilo>;
  // cilo_tla belongsTo course_tla via course_tla_id
  course_tla!: course_tla;
  getCourse_tla!: Sequelize.BelongsToGetAssociationMixin<course_tla>;
  setCourse_tla!: Sequelize.BelongsToSetAssociationMixin<course_tla, course_tlaId>;
  createCourse_tla!: Sequelize.BelongsToCreateAssociationMixin<course_tla>;

  static initModel(sequelize: Sequelize.Sequelize): typeof cilo_tla {
    return cilo_tla.init({
    cilo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'cilo',
        key: 'cilo_id'
      }
    },
    course_tla_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'course_tla',
        key: 'course_tla_id'
      }
    }
  }, {
    sequelize,
    tableName: 'cilo_tla',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_cilo_tla",
        unique: true,
        fields: [
          { name: "cilo_id" },
          { name: "course_tla_id" },
        ]
      },
    ]
  });
  }
}
