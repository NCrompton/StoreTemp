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
exports.IDMap = void 0;
const Sequelize = __importStar(require("sequelize"));
const sequelize_1 = require("sequelize");
class IDMap extends sequelize_1.Model {
    static initModel(sequelize) {
        return IDMap.init({
            cityu_id: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false
            },
            eid: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false
            },
            email: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false
            },
            uid: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false
            },
            gp: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            e_name: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false
            },
            created_date: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                defaultValue: Sequelize.Sequelize.fn('getdate')
            },
            modified_date: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                defaultValue: Sequelize.Sequelize.fn('getdate')
            },
            db_access_user: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                defaultValue: Sequelize.Sequelize.fn('suser_sname')
            },
            timestamp: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false
            },
            rhost: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                defaultValue: Sequelize.Sequelize.fn('host_name')
            }
        }, {
            sequelize,
            tableName: 'IDMap',
            schema: 'dbo',
            timestamps: false
        });
    }
}
exports.IDMap = IDMap;
//# sourceMappingURL=IDMap.js.map