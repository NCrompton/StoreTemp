"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.course_detail_log = void 0;
const sequelize_1 = require("sequelize");
class course_detail_log extends sequelize_1.Model {
    static initModel(sequelize) {
        return course_detail_log.init({
            course_detail_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            course_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
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
                allowNull: false
            },
            date_modified: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false
            },
            grade_pattern: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: true
            },
            cohort_from: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            cohort_to: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
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
                allowNull: false
            },
            r_host: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false
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
                type: sequelize_1.DataTypes.BLOB,
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'course_detail_log',
            schema: 'dbo',
            timestamps: false
        });
    }
}
exports.course_detail_log = course_detail_log;
//# sourceMappingURL=course_detail_log.js.map