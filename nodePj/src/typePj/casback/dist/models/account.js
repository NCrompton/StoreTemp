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
exports.account = void 0;
const Sequelize = __importStar(require("sequelize"));
const sequelize_1 = require("sequelize");
class account extends sequelize_1.Model {
    static initModel(sequelize) {
        return account.init({
            account_id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            sso_id: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false
            },
            e_name: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: false
            },
            c_name: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            title: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: true
            },
            type: {
                type: sequelize_1.DataTypes.SMALLINT,
                allowNull: false,
                defaultValue: 1
            },
            permission: {
                type: sequelize_1.DataTypes.TEXT,
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
            player_version: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: true
            },
            last_logon: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true
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
            },
            is_current: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        }, {
            sequelize,
            tableName: 'account',
            schema: 'dbo',
            timestamps: false,
            indexes: [
                {
                    name: "PK_account",
                    unique: true,
                    fields: [
                        { name: "account_id" },
                    ]
                },
            ]
        });
    }
}
exports.account = account;
//# sourceMappingURL=account.js.map