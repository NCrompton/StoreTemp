import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface course_archiveAttributes {
  course_archive_id: number;
  code: string;
  title: string;
  date_created: Date;
  web_logon_name?: string;
  web_logon_host?: string;
  u_name: string;
  r_host: string;
}

export type course_archivePk = "course_archive_id";
export type course_archiveId = course_archive[course_archivePk];
export type course_archiveOptionalAttributes = "course_archive_id" | "date_created" | "web_logon_name" | "web_logon_host" | "u_name" | "r_host";
export type course_archiveCreationAttributes = Optional<course_archiveAttributes, course_archiveOptionalAttributes>;

export class course_archive extends Model<course_archiveAttributes, course_archiveCreationAttributes> implements course_archiveAttributes {
  course_archive_id!: number;
  code!: string;
  title!: string;
  date_created!: Date;
  web_logon_name?: string;
  web_logon_host?: string;
  u_name!: string;
  r_host!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof course_archive {
    return course_archive.init({
    course_archive_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: "UK_course_archive"
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    web_logon_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    web_logon_host: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    u_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('suser_sname')
    },
    r_host: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('host_name')
    }
  }, {
    sequelize,
    tableName: 'course_archive',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_course_archive",
        unique: true,
        fields: [
          { name: "course_archive_id" },
        ]
      },
      {
        name: "UK_course_archive",
        unique: true,
        fields: [
          { name: "code" },
        ]
      },
    ]
  });
  }
}
