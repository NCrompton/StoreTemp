"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prog_staff = void 0;
const sequelize_1 = require("sequelize");
class prog_staff extends sequelize_1.Model {
    static initModel(sequelize) {
        return prog_staff.init({
            programme_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'programme',
                    key: 'programme_id'
                }
            },
            staff_sso_id: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                primaryKey: true
            }
        }, {
            sequelize,
            tableName: 'prog_staff',
            schema: 'dbo',
            timestamps: false,
            indexes: [
                {
                    name: "PK__prog_sta__2E2B747F58671BC9",
                    unique: true,
                    fields: [
                        { name: "programme_id" },
                        { name: "staff_sso_id" },
                    ]
                },
            ]
        });
    }
}
exports.prog_staff = prog_staff;
//# sourceMappingURL=prog_staff.js.map