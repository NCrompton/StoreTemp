import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { cilo, ciloId } from './cilo';
import type { cilo_at, cilo_atId } from './cilo_at';

export interface course_atAttributes {
  course_at_id: number;
  course_detail_id: number;
  title: string;
  desc?: string;
  date_created: Date;
  date_modified: Date;
}

export type course_atPk = "course_at_id";
export type course_atId = course_at[course_atPk];
export type course_atOptionalAttributes = "course_at_id" | "desc" | "date_created" | "date_modified";
export type course_atCreationAttributes = Optional<course_atAttributes, course_atOptionalAttributes>;

export class course_at extends Model<course_atAttributes, course_atCreationAttributes> implements course_atAttributes {
  course_at_id!: number;
  course_detail_id!: number;
  title!: string;
  desc?: string;
  date_created!: Date;
  date_modified!: Date;

  // course_at belongsToMany cilo via course_at_id and cilo_id
  cilo_id_cilos!: cilo[];
  getCilo_id_cilos!: Sequelize.BelongsToManyGetAssociationsMixin<cilo>;
  setCilo_id_cilos!: Sequelize.BelongsToManySetAssociationsMixin<cilo, ciloId>;
  addCilo_id_cilo!: Sequelize.BelongsToManyAddAssociationMixin<cilo, ciloId>;
  addCilo_id_cilos!: Sequelize.BelongsToManyAddAssociationsMixin<cilo, ciloId>;
  createCilo_id_cilo!: Sequelize.BelongsToManyCreateAssociationMixin<cilo>;
  removeCilo_id_cilo!: Sequelize.BelongsToManyRemoveAssociationMixin<cilo, ciloId>;
  removeCilo_id_cilos!: Sequelize.BelongsToManyRemoveAssociationsMixin<cilo, ciloId>;
  hasCilo_id_cilo!: Sequelize.BelongsToManyHasAssociationMixin<cilo, ciloId>;
  hasCilo_id_cilos!: Sequelize.BelongsToManyHasAssociationsMixin<cilo, ciloId>;
  countCilo_id_cilos!: Sequelize.BelongsToManyCountAssociationsMixin;
  // course_at hasMany cilo_at via course_at_id
  cilo_ats!: cilo_at[];
  getCilo_ats!: Sequelize.HasManyGetAssociationsMixin<cilo_at>;
  setCilo_ats!: Sequelize.HasManySetAssociationsMixin<cilo_at, cilo_atId>;
  addCilo_at!: Sequelize.HasManyAddAssociationMixin<cilo_at, cilo_atId>;
  addCilo_ats!: Sequelize.HasManyAddAssociationsMixin<cilo_at, cilo_atId>;
  createCilo_at!: Sequelize.HasManyCreateAssociationMixin<cilo_at>;
  removeCilo_at!: Sequelize.HasManyRemoveAssociationMixin<cilo_at, cilo_atId>;
  removeCilo_ats!: Sequelize.HasManyRemoveAssociationsMixin<cilo_at, cilo_atId>;
  hasCilo_at!: Sequelize.HasManyHasAssociationMixin<cilo_at, cilo_atId>;
  hasCilo_ats!: Sequelize.HasManyHasAssociationsMixin<cilo_at, cilo_atId>;
  countCilo_ats!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof course_at {
    return course_at.init({
    course_at_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    course_detail_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    desc: {
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
    }
  }, {
    sequelize,
    tableName: 'course_at',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_course_at",
        unique: true,
        fields: [
          { name: "course_at_id" },
        ]
      },
    ]
  });
  }
}
