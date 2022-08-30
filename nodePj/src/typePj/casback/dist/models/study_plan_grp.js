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
exports.study_plan_grp = void 0;
const Sequelize = __importStar(require("sequelize"));
const sequelize_1 = require("sequelize");
class study_plan_grp extends sequelize_1.Model {
    static initModel(sequelize) {
        return study_plan_grp.init({
            study_plan_grp_id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            study_plan_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'study_plan',
                    key: 'study_plan_id'
                }
            },
            semester_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            title: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false
            },
            desc: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false
            },
            credit_min: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            credit_max: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            remark: {
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
            }
        }, {
            sequelize,
            tableName: 'study_plan_grp',
            schema: 'dbo',
            timestamps: false,
            indexes: [
                {
                    name: "PK_study_plan_grp",
                    unique: true,
                    fields: [
                        { name: "study_plan_grp_id" },
                    ]
                },
            ]
        });
    }
}
exports.study_plan_grp = study_plan_grp;
//# sourceMappingURL=study_plan_grp.js.map