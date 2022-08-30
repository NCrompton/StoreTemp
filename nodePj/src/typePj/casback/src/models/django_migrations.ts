import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface django_migrationsAttributes {
  id: number;
  app: string;
  name: string;
  applied: Date;
}

export type django_migrationsPk = "id";
export type django_migrationsId = django_migrations[django_migrationsPk];
export type django_migrationsOptionalAttributes = "id";
export type django_migrationsCreationAttributes = Optional<django_migrationsAttributes, django_migrationsOptionalAttributes>;

export class django_migrations extends Model<django_migrationsAttributes, django_migrationsCreationAttributes> implements django_migrationsAttributes {
  id!: number;
  app!: string;
  name!: string;
  applied!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof django_migrations {
    return django_migrations.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    app: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    applied: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'django_migrations',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__django_m__3213E83FB168F6FD",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
