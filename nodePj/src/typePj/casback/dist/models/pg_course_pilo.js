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
exports.pg_course_pilo = void 0;
const Sequelize = __importStar(require("sequelize"));
const sequelize_1 = require("sequelize");
class pg_course_pilo extends sequelize_1.Model {
    static initModel(sequelize) {
        return pg_course_pilo.init({
            course_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'course',
                    key: 'course_id'
                }
            },
            pilo_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'pilo',
                    key: 'pilo_id'
                }
            },
            prog_grp_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'prog_grp',
                    key: 'prog_grp_id'
                }
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
            type: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                defaultValue: "T,P,M,X,X,X,X,X,X"
            }
        }, {
            sequelize,
            tableName: 'pg_course_pilo',
            schema: 'dbo',
            timestamps: false,
            indexes: [
                {
                    name: "PK_pg_course_pilo",
                    unique: true,
                    fields: [
                        { name: "course_id" },
                        { name: "pilo_id" },
                        { name: "prog_grp_id" },
                    ]
                },
            ]
        });
    }
}
exports.pg_course_pilo = pg_course_pilo;
//# sourceMappingURL=pg_course_pilo.js.map