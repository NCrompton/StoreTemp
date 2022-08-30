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
exports.semester = void 0;
const Sequelize = __importStar(require("sequelize"));
const sequelize_1 = require("sequelize");
class semester extends sequelize_1.Model {
    static initModel(sequelize) {
        return semester.init({
            semester_id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            start_date: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true
            },
            end_date: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true
            },
            year: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: false
            },
            code: {
                type: sequelize_1.DataTypes.STRING(5),
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
            }
        }, {
            sequelize,
            tableName: 'semester',
            schema: 'dbo',
            timestamps: false,
            indexes: [
                {
                    name: "PK_semester",
                    unique: true,
                    fields: [
                        { name: "semester_id" },
                    ]
                },
            ]
        });
    }
}
exports.semester = semester;
//# sourceMappingURL=semester.js.map