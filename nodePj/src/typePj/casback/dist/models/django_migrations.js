"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.django_migrations = void 0;
const sequelize_1 = require("sequelize");
class django_migrations extends sequelize_1.Model {
    static initModel(sequelize) {
        return django_migrations.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true
            },
            app: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            name: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            applied: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'django_migrations',
            schema: 'dbo',
            timestamps: false,
            indexes: [
                {
                    name: "PK__django_m__3213E83FB168F6FD",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.django_migrations = django_migrations;
//# sourceMappingURL=django_migrations.js.map