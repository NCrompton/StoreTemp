import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { pg_course_pilo, pg_course_piloId } from './pg_course_pilo';
import type { programme, programmeId } from './programme';

export interface piloAttributes {
  pilo_id: number;
  programme_id: number;
  desc?: string;
  seq?: number;
  date_created: Date;
  date_modified: Date;
}

export type piloPk = "pilo_id";
export type piloId = pilo[piloPk];
export type piloOptionalAttributes = "pilo_id" | "desc" | "seq" | "date_created" | "date_modified";
export type piloCreationAttributes = Optional<piloAttributes, piloOptionalAttributes>;

export class pilo extends Model<piloAttributes, piloCreationAttributes> implements piloAttributes {
  pilo_id!: number;
  programme_id!: number;
  desc?: string;
  seq?: number;
  date_created!: Date;
  date_modified!: Date;

  // pilo hasMany pg_course_pilo via pilo_id
  pg_course_pilos!: pg_course_pilo[];
  getPg_course_pilos!: Sequelize.HasManyGetAssociationsMixin<pg_course_pilo>;
  setPg_course_pilos!: Sequelize.HasManySetAssociationsMixin<pg_course_pilo, pg_course_piloId>;
  addPg_course_pilo!: Sequelize.HasManyAddAssociationMixin<pg_course_pilo, pg_course_piloId>;
  addPg_course_pilos!: Sequelize.HasManyAddAssociationsMixin<pg_course_pilo, pg_course_piloId>;
  createPg_course_pilo!: Sequelize.HasManyCreateAssociationMixin<pg_course_pilo>;
  removePg_course_pilo!: Sequelize.HasManyRemoveAssociationMixin<pg_course_pilo, pg_course_piloId>;
  removePg_course_pilos!: Sequelize.HasManyRemoveAssociationsMixin<pg_course_pilo, pg_course_piloId>;
  hasPg_course_pilo!: Sequelize.HasManyHasAssociationMixin<pg_course_pilo, pg_course_piloId>;
  hasPg_course_pilos!: Sequelize.HasManyHasAssociationsMixin<pg_course_pilo, pg_course_piloId>;
  countPg_course_pilos!: Sequelize.HasManyCountAssociationsMixin;
  // pilo belongsTo programme via programme_id
  programme!: programme;
  getProgramme!: Sequelize.BelongsToGetAssociationMixin<programme>;
  setProgramme!: Sequelize.BelongsToSetAssociationMixin<programme, programmeId>;
  createProgramme!: Sequelize.BelongsToCreateAssociationMixin<programme>;

  static initModel(sequelize: Sequelize.Sequelize): typeof pilo {
    return pilo.init({
    pilo_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    programme_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'programme',
        key: 'programme_id'
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
    tableName: 'pilo',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_pilo",
        unique: true,
        fields: [
          { name: "pilo_id" },
        ]
      },
    ]
  });
  }
}
