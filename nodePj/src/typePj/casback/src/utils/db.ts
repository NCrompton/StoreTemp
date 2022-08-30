import { Sequelize } from "sequelize"
import config from "dotenv/config"
config

export const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PWD,
	{ host: process.env.DB_SITE, dialect: "mssql" }
)
