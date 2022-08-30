import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { cilo, ciloId } from './cilo';
import type { cilo_tla, cilo_tlaId } from './cilo_tla';

export interface course_tlaAttributes {
  course_tla_id: number;
  course_detail_id: number;
  title: string;
  desc?: string;
  date_created: Date;
  date_modified: Date;
}

export type course_tlaPk = "course_tla_id";
export type course_tlaId = course_tla[course_tlaPk];
export type course_tlaOptionalAttributes = "course_tla_id" | "desc" | "date_created" | "date_modified";
export type course_tlaCreationAttributes = Optional<course_tlaAttributes, course_tlaOptionalAttributes>;

export class course_tla extends Model<course_tlaAttributes, course_tlaCreationAttributes> implements course_tlaAttributes {
  course_tla_id!: number;
  course_detail_id!: number;
  title!: string;
  desc?: string;
  date_created!: Date;
  date_modified!: Date;

  // course_tla belongsToMany cilo via course_tla_id and cilo_id
  cilo_id_cilo_cilo_tlas!: cilo[];
  getCilo_id_cilo_cilo_tlas!: Sequelize.BelongsToManyGetAssociationsMixin<cilo>;
  setCilo_id_cilo_cilo_tlas!: Sequelize.BelongsToManySetAssociationsMixin<cilo, ciloId>;
  addCilo_id_cilo_cilo_tla!: Sequelize.BelongsToManyAddAssociationMixin<cilo, ciloId>;
  addCilo_id_cilo_cilo_tlas!: Sequelize.BelongsToManyAddAssociationsMixin<cilo, ciloId>;
  createCilo_id_cilo_cilo_tla!: Sequelize.BelongsToManyCreateAssociationMixin<cilo>;
  removeCilo_id_cilo_cilo_tla!: Sequelize.BelongsToManyRemoveAssociationMixin<cilo, ciloId>;
  removeCilo_id_cilo_cilo_tlas!: Sequelize.BelongsToManyRemoveAssociationsMixin<cilo, ciloId>;
  hasCilo_id_cilo_cilo_tla!: Sequelize.BelongsToManyHasAssociationMixin<cilo, ciloId>;
  hasCilo_id_cilo_cilo_tlas!: Sequelize.BelongsToManyHasAssociationsMixin<cilo, ciloId>;
  countCilo_id_cilo_cilo_tlas!: Sequelize.BelongsToManyCountAssociationsMixin;
  // course_tla hasMany cilo_tla via course_tla_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof course_tla {
    return course_tla.init({
    course_tla_id: {
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
    tableName: 'course_tla',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_course_tla",
        unique: true,
        fields: [
          { name: "course_tla_id" },
        ]
      },
    ]
  });
  }
}
