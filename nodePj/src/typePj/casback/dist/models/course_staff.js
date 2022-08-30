"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.course_staff = void 0;
const sequelize_1 = require("sequelize");
class course_staff extends sequelize_1.Model {
    static initModel(sequelize) {
        return course_staff.init({
            course_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'course',
                    key: 'course_id'
                }
            },
            staff_sso_id: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                primaryKey: true
            }
        }, {
            sequelize,
            tableName: 'course_staff',
            schema: 'dbo',
            timestamps: false,
            indexes: [
                {
                    name: "PK_course_staff",
                    unique: true,
                    fields: [
                        { name: "course_id" },
                        { name: "staff_sso_id" },
                    ]
                },
            ]
        });
    }
}
exports.course_staff = course_staff;
//# sourceMappingURL=course_staff.js.map