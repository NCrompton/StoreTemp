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
exports.report = void 0;
const Sequelize = __importStar(require("sequelize"));
const sequelize_1 = require("sequelize");
class report extends sequelize_1.Model {
    static initModel(sequelize) {
        return report.init({
            report_id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            account_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'account',
                    key: 'account_id'
                }
            },
            title: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            desc: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            password: {
                type: sequelize_1.DataTypes.STRING(256),
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
            fields: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            criteria: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            view: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: true
            },
            is_share: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            type: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
        }, {
            sequelize,
            tableName: 'report',
            schema: 'dbo',
            timestamps: false,
            indexes: [
                {
                    name: "PK_report",
                    unique: true,
                    fields: [
                        { name: "report_id" },
                    ]
                },
            ]
        });
    }
}
exports.report = report;
//# sourceMappingURL=report.js.map