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
exports.prog_course_offer = void 0;
const Sequelize = __importStar(require("sequelize"));
const sequelize_1 = require("sequelize");
class prog_course_offer extends sequelize_1.Model {
    static initModel(sequelize) {
        return prog_course_offer.init({
            prog_course_offer_id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            programme_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'programme',
                    key: 'programme_id'
                }
            },
            course_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'course',
                    key: 'course_id'
                }
            },
            code_remark: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            title_remark: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            unit_remark: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            prerequisite_remark: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            precursor_remark: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            equivalent_remark: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            equivalent_old_remark: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            exclusive_remark: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            offered_sem: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            remark: {
                type: sequelize_1.DataTypes.TEXT,
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
            web_logon_name: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            web_logon_host: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            u_name: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                defaultValue: Sequelize.Sequelize.fn('suser_sname')
            },
            r_host: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                defaultValue: Sequelize.Sequelize.fn('host_name')
            },
            timestamp: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false
            },
            is_show_exclusive_with_title: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        }, {
            sequelize,
            tableName: 'prog_course_offer',
            schema: 'dbo',
            timestamps: false,
            indexes: [
                {
                    name: "PK_prog_course_offer",
                    unique: true,
                    fields: [
                        { name: "prog_course_offer_id" },
                    ]
                },
            ]
        });
    }
}
exports.prog_course_offer = prog_course_offer;
//# sourceMappingURL=prog_course_offer.js.map