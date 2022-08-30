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
exports.prog_grp_course = void 0;
const Sequelize = __importStar(require("sequelize"));
const sequelize_1 = require("sequelize");
class prog_grp_course extends sequelize_1.Model {
    static initModel(sequelize) {
        return prog_grp_course.init({
            prog_grp_course_id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            prog_grp_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'prog_grp',
                    key: 'prog_grp_id'
                },
                unique: "UK_prog_grp_course"
            },
            course_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'course',
                    key: 'course_id'
                },
                unique: "UK_prog_grp_course"
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
            tableName: 'prog_grp_course',
            schema: 'dbo',
            timestamps: false,
            indexes: [
                {
                    name: "PK_prog_grp_course",
                    unique: true,
                    fields: [
                        { name: "prog_grp_course_id" },
                    ]
                },
                {
                    name: "UK_prog_grp_course",
                    unique: true,
                    fields: [
                        { name: "prog_grp_id" },
                        { name: "course_id" },
                    ]
                },
            ]
        });
    }
}
exports.prog_grp_course = prog_grp_course;
//# sourceMappingURL=prog_grp_course.js.map