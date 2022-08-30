"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cilo_tla = void 0;
const sequelize_1 = require("sequelize");
class cilo_tla extends sequelize_1.Model {
    static initModel(sequelize) {
        return cilo_tla.init({
            cilo_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'cilo',
                    key: 'cilo_id'
                }
            },
            course_tla_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'course_tla',
                    key: 'course_tla_id'
                }
            }
        }, {
            sequelize,
            tableName: 'cilo_tla',
            schema: 'dbo',
            timestamps: false,
            indexes: [
                {
                    name: "PK_cilo_tla",
                    unique: true,
                    fields: [
                        { name: "cilo_id" },
                        { name: "course_tla_id" },
                    ]
                },
            ]
        });
    }
}
exports.cilo_tla = cilo_tla;
//# sourceMappingURL=cilo_tla.js.map