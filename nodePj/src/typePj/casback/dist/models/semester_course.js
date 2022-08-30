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
exports.semester_course = void 0;
const Sequelize = __importStar(require("sequelize"));
const sequelize_1 = require("sequelize");
class semester_course extends sequelize_1.Model {
    static initModel(sequelize) {
        return semester_course.init({
            semester_course_id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            course_detail_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'course_detail',
                    key: 'course_detail_id'
                }
            },
            semester_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'semester',
                    key: 'semester_id'
                }
            },
            credit: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            capacity: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            c_hr: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            t_hr: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            l_hr: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            s_hr: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            remark: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            is_current: {
                type: sequelize_1.DataTypes.BOOLEAN,
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
            sem_hr: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            sl_hr: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            tutorial: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            staff: {
                type: sequelize_1.DataTypes.STRING(150),
                allowNull: true
            },
            prog_name: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: true
            },
            prog_repeat: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            prog_stu_num: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            prog_year: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            prog_cohort: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            prog_intake: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            prog_mode: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            prog_dept: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            prog_course_type: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            prog_fund_mode: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            web_logon_name: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            web_logon_host: {
                type: sequelize_1.DataTypes.STRING(50),
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
            code: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: true
            },
            name: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'semester_course',
            schema: 'dbo',
            hasTrigger: true,
            timestamps: false,
            indexes: [
                {
                    name: "PK_semester_course",
                    unique: true,
                    fields: [
                        { name: "semester_course_id" },
                    ]
                },
            ]
        });
    }
}
exports.semester_course = semester_course;
//# sourceMappingURL=semester_course.js.map