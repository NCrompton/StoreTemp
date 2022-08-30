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
exports.course_detail = void 0;
const Sequelize = __importStar(require("sequelize"));
const sequelize_1 = require("sequelize");
class course_detail extends sequelize_1.Model {
    static initModel(sequelize) {
        return course_detail.init({
            course_detail_id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            course_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'course',
                    key: 'course_id'
                }
            },
            name: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: true
            },
            credit: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            duration: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            level: {
                type: sequelize_1.DataTypes.STRING(5),
                allowNull: true
            },
            medium: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: true
            },
            cw_percent: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            exam_percent: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            exam_duration: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            precursor: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            prerequisite: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            equivalent: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            exclusive: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            fund_mode: {
                type: sequelize_1.DataTypes.STRING(25),
                allowNull: true
            },
            cef_course: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true
            },
            block_transfer: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true
            },
            remark: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            version: {
                type: sequelize_1.DataTypes.SMALLINT,
                allowNull: true
            },
            is_current: {
                type: sequelize_1.DataTypes.SMALLINT,
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
            grade_pattern: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: true
            },
            cohort_from: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            cohort_to: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            aim: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            grade_remark: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            kw_syllabus: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            syllabus: {
                type: sequelize_1.DataTypes.TEXT,
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
            web_logon_name: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            web_logon_host: {
                type: sequelize_1.DataTypes.STRING(150),
                allowNull: true
            },
            text_reading: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            online_reading: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            semester_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            equivalent_old: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            timestamp: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'course_detail',
            schema: 'dbo',
            hasTrigger: true,
            timestamps: false,
            indexes: [
                {
                    name: "PK_course_detail",
                    unique: true,
                    fields: [
                        { name: "course_detail_id" },
                    ]
                },
            ]
        });
    }
}
exports.course_detail = course_detail;
//# sourceMappingURL=course_detail.js.map