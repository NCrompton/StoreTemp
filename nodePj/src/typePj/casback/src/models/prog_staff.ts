import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { programme, programmeId } from './programme';

export interface prog_staffAttributes {
  programme_id: number;
  staff_sso_id: string;
}

export type prog_staffPk = "programme_id" | "staff_sso_id";
export type prog_staffId = prog_staff[prog_staffPk];
export type prog_staffCreationAttributes = prog_staffAttributes;

export class prog_staff extends Model<prog_staffAttributes, prog_staffCreationAttributes> implements prog_staffAttributes {
  programme_id!: number;
  staff_sso_id!: string;

  // prog_staff belongsTo programme via programme_id
  programme!: programme;
  getProgramme!: Sequelize.BelongsToGetAssociationMixin<programme>;
  setProgramme!: Sequelize.BelongsToSetAssociationMixin<programme, programmeId>;
  createProgramme!: Sequelize.BelongsToCreateAssociationMixin<programme>;

  static initModel(sequelize: Sequelize.Sequelize): typeof prog_staff {
    return prog_staff.init({
    programme_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'programme',
        key: 'programme_id'
      }
    },
    staff_sso_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'prog_staff',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__prog_sta__2E2B747F58671BC9",
        unique: true,
        fields: [
          { name: "programme_id" },
          { name: "staff_sso_id" },
        ]
      },
    ]
  });
  }
}
