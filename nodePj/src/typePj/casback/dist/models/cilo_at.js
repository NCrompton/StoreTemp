"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cilo_at = void 0;
const sequelize_1 = require("sequelize");
class cilo_at extends sequelize_1.Model {
    static initModel(sequelize) {
        return cilo_at.init({
            cilo_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'cilo',
                    key: 'cilo_id'
                }
            },
            course_at_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'course_at',
                    key: 'course_at_id'
                }
            }
        }, {
            sequelize,
            tableName: 'cilo_at',
            schema: 'dbo',
            timestamps: false,
            indexes: [
                {
                    name: "PK_cilo_at",
                    unique: true,
                    fields: [
                        { name: "cilo_id" },
                        { name: "course_at_id" },
                    ]
                },
            ]
        });
    }
}
exports.cilo_at = cilo_at;
//# sourceMappingURL=cilo_at.js.map