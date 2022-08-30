"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.programme = void 0;
const Sequelize = __importStar(require("sequelize"));
const sequelize_1 = require("sequelize");
class programme extends sequelize_1.Model {
    static initModel(sequelize) {
        return programme.init({
            programme_id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: true
            },
            award_title: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: true
            },
            code: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: true
            },
            alias: {
                type: sequelize_1.DataTypes.STRING(40),
                allowNull: true
            },
            dept: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: true
            },
            mode: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: true
            },
            fund_mode: {
                type: sequelize_1.DataTypes.STRING(25),
                allowNull: true
            },
            cohort: {
                type: sequelize_1.DataTypes.STRING(8),
                allowNull: true
            },
            intake: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            date_created: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.Sequelize.fn('getdate')
            },
            date_modified: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.Sequelize.fn('getdate')
            },
            web_logon_name: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            web_logon_host: {
                type: sequelize_1.DataTypes.STRING(150),
                allowNull: true
            },
            u_name: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                defaultValue: Sequelize.Sequelize.fn('suser_sname')
            },
            r_host: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                defaultValue: Sequelize.Sequelize.fn('host_name')
            }
        }, {
            sequelize,
            tableName: 'programme',
            schema: 'dbo',
            timestamps: false,
            indexes: [
                {
                    name: "PK_programme",
                    unique: true,
                    fields: [
                        { name: "programme_id" },
                    ]
                },
                {
                    name: "UK_code_cohort",
                    unique: true,
                    fields: [
                        { name: "code" },
                        { name: "cohort" },
                    ]
                },
            ]
        });
    }
}
exports.programme = programme;
//# sourceMappingURL=programme.js.map