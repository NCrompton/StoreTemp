import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { cilo_at, cilo_atId } from './cilo_at';
import type { cilo_tla, cilo_tlaId } from './cilo_tla';
import type { course_at, course_atId } from './course_at';
import type { course_detail, course_detailId } from './course_detail';
import type { course_tla, course_tlaId } from './course_tla';

export interface ciloAttributes {
  cilo_id: number;
  course_detail_id: number;
  desc?: string;
  seq?: number;
  date_created: Date;
  date_modified: Date;
}

export type ciloPk = "cilo_id";
export type ciloId = cilo[ciloPk];
export type ciloOptionalAttributes = "cilo_id" | "desc" | "seq" | "date_created" | "date_modified";
export type ciloCreationAttributes = Optional<ciloAttributes, ciloOptionalAttributes>;

export class cilo extends Model<ciloAttributes, ciloCreationAttributes> implements ciloAttributes {
  cilo_id!: number;
  course_detail_id!: number;
  desc?: string;
  seq?: number;
  date_created!: Date;
  date_modified!: Date;

  // cilo hasMany cilo_at via cilo_id
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
  // cilo hasMany cilo_tla via cilo_id
  cilo_tlas!: cilo_tla[];
  getCilo_tlas!: Sequelize.HasManyGetAssociationsMixin<cilo_tla>;
  setCilo_tlas!: Sequelize.HasManySetAssociationsMixin<cilo_tla, cilo_tlaId>;
  addCilo_tla!: Sequelize.HasManyAddAssociationMixin<cilo_tla, cilo_tlaId>;
  addCilo_tlas!: Sequelize.HasManyAddAssociationsMixin<cilo_tla, cilo_tlaId>;
  createCilo_tla!: Sequelize.HasManyCreateAssociationMixin<cilo_tla>;
  removeCilo_tla!: Sequelize.HasManyRemoveAssociationMixin<cilo_tla, cilo_tlaId>;
  removeCilo_tlas!: Sequelize.HasManyRemoveAssociationsMixin<cilo_tla, cilo_tlaId>;
  hasCilo_tla!: Sequelize.HasManyHasAssociationMixin<cilo_tla, cilo_tlaId>;
  hasCilo_tlas!: Sequelize.HasManyHasAssociationsMixin<cilo_tla, cilo_tlaId>;
  countCilo_tlas!: Sequelize.HasManyCountAssociationsMixin;
  // cilo belongsToMany course_at via cilo_id and course_at_id
  course_at_id_course_ats!: course_at[];
  getCourse_at_id_course_ats!: Sequelize.BelongsToManyGetAssociationsMixin<course_at>;
  setCourse_at_id_course_ats!: Sequelize.BelongsToManySetAssociationsMixin<course_at, course_atId>;
  addCourse_at_id_course_at!: Sequelize.BelongsToManyAddAssociationMixin<course_at, course_atId>;
  addCourse_at_id_course_ats!: Sequelize.BelongsToManyAddAssociationsMixin<course_at, course_atId>;
  createCourse_at_id_course_at!: Sequelize.BelongsToManyCreateAssociationMixin<course_at>;
  removeCourse_at_id_course_at!: Sequelize.BelongsToManyRemoveAssociationMixin<course_at, course_atId>;
  removeCourse_at_id_course_ats!: Sequelize.BelongsToManyRemoveAssociationsMixin<course_at, course_atId>;
  hasCourse_at_id_course_at!: Sequelize.BelongsToManyHasAssociationMixin<course_at, course_atId>;
  hasCourse_at_id_course_ats!: Sequelize.BelongsToManyHasAssociationsMixin<course_at, course_atId>;
  countCourse_at_id_course_ats!: Sequelize.BelongsToManyCountAssociationsMixin;
  // cilo belongsToMany course_tla via cilo_id and course_tla_id
  course_tla_id_course_tlas!: course_tla[];
  getCourse_tla_id_course_tlas!: Sequelize.BelongsToManyGetAssociationsMixin<course_tla>;
  setCourse_tla_id_course_tlas!: Sequelize.BelongsToManySetAssociationsMixin<course_tla, course_tlaId>;
  addCourse_tla_id_course_tla!: Sequelize.BelongsToManyAddAssociationMixin<course_tla, course_tlaId>;
  addCourse_tla_id_course_tlas!: Sequelize.BelongsToManyAddAssociationsMixin<course_tla, course_tlaId>;
  createCourse_tla_id_course_tla!: Sequelize.BelongsToManyCreateAssociationMixin<course_tla>;
  removeCourse_tla_id_course_tla!: Sequelize.BelongsToManyRemoveAssociationMixin<course_tla, course_tlaId>;
  removeCourse_tla_id_course_tlas!: Sequelize.BelongsToManyRemoveAssociationsMixin<course_tla, course_tlaId>;
  hasCourse_tla_id_course_tla!: Sequelize.BelongsToManyHasAssociationMixin<course_tla, course_tlaId>;
  hasCourse_tla_id_course_tlas!: Sequelize.BelongsToManyHasAssociationsMixin<course_tla, course_tlaId>;
  countCourse_tla_id_course_tlas!: Sequelize.BelongsToManyCountAssociationsMixin;
  // cilo belongsTo course_detail via course_detail_id
  course_detail!: course_detail;
  getCourse_detail!: Sequelize.BelongsToGetAssociationMixin<course_detail>;
  setCourse_detail!: Sequelize.BelongsToSetAssociationMixin<course_detail, course_detailId>;
  createCourse_detail!: Sequelize.BelongsToCreateAssociationMixin<course_detail>;

  static initModel(sequelize: Sequelize.Sequelize): typeof cilo {
    return cilo.init({
    cilo_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    course_detail_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'course_detail',
        key: 'course_detail_id'
      }
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    seq: {
      type: DataTypes.INTEGER,
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
    tableName: 'cilo',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_cilo",
        unique: true,
        fields: [
          { name: "cilo_id" },
        ]
      },
    ]
  });
  }
}
