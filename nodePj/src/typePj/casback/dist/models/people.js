"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.people = void 0;
const sequelize_1 = require("sequelize");
class people extends sequelize_1.Model {
    static initModel(sequelize) {
        return people.init({
            section_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            section_name: {
                type: sequelize_1.DataTypes.STRING(200),
                allowNull: true
            },
            is_tdshow: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false
            },
            title: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            e_name: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: true
            },
            c_name: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            sso_id: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'people',
            schema: 'dbo',
            timestamps: false
        });
    }
}
exports.people = people;
//# sourceMappingURL=people.js.map