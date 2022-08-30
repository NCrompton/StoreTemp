"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.model = exports.initModels = exports.study_plan_grp = exports.study_plan = exports.semester_course_log = exports.semester_course = exports.semester = exports.report = exports.programme = exports.prog_staff = exports.prog_grp_course = exports.prog_grp = exports.prog_course_offer = exports.pilo = exports.pg_course_pilo = exports.people = exports.django_migrations = exports.course_tla = exports.course_staff = exports.course_detail_log = exports.course_detail = exports.course_at = exports.course_archive = exports.course = exports.cilo_tla = exports.cilo_at = exports.cilo = exports.account = exports.IDMap = void 0;
const db_1 = require("../utils/db");
const IDMap_1 = require("./IDMap");
Object.defineProperty(exports, "IDMap", { enumerable: true, get: function () { return IDMap_1.IDMap; } });
const account_1 = require("./account");
Object.defineProperty(exports, "account", { enumerable: true, get: function () { return account_1.account; } });
const cilo_1 = require("./cilo");
Object.defineProperty(exports, "cilo", { enumerable: true, get: function () { return cilo_1.cilo; } });
const cilo_at_1 = require("./cilo_at");
Object.defineProperty(exports, "cilo_at", { enumerable: true, get: function () { return cilo_at_1.cilo_at; } });
const cilo_tla_1 = require("./cilo_tla");
Object.defineProperty(exports, "cilo_tla", { enumerable: true, get: function () { return cilo_tla_1.cilo_tla; } });
const course_1 = require("./course");
Object.defineProperty(exports, "course", { enumerable: true, get: function () { return course_1.course; } });
const course_archive_1 = require("./course_archive");
Object.defineProperty(exports, "course_archive", { enumerable: true, get: function () { return course_archive_1.course_archive; } });
const course_at_1 = require("./course_at");
Object.defineProperty(exports, "course_at", { enumerable: true, get: function () { return course_at_1.course_at; } });
const course_detail_1 = require("./course_detail");
Object.defineProperty(exports, "course_detail", { enumerable: true, get: function () { return course_detail_1.course_detail; } });
const course_detail_log_1 = require("./course_detail_log");
Object.defineProperty(exports, "course_detail_log", { enumerable: true, get: function () { return course_detail_log_1.course_detail_log; } });
const course_staff_1 = require("./course_staff");
Object.defineProperty(exports, "course_staff", { enumerable: true, get: function () { return course_staff_1.course_staff; } });
const course_tla_1 = require("./course_tla");
Object.defineProperty(exports, "course_tla", { enumerable: true, get: function () { return course_tla_1.course_tla; } });
const django_migrations_1 = require("./django_migrations");
Object.defineProperty(exports, "django_migrations", { enumerable: true, get: function () { return django_migrations_1.django_migrations; } });
const people_1 = require("./people");
Object.defineProperty(exports, "people", { enumerable: true, get: function () { return people_1.people; } });
const pg_course_pilo_1 = require("./pg_course_pilo");
Object.defineProperty(exports, "pg_course_pilo", { enumerable: true, get: function () { return pg_course_pilo_1.pg_course_pilo; } });
const pilo_1 = require("./pilo");
Object.defineProperty(exports, "pilo", { enumerable: true, get: function () { return pilo_1.pilo; } });
const prog_course_offer_1 = require("./prog_course_offer");
Object.defineProperty(exports, "prog_course_offer", { enumerable: true, get: function () { return prog_course_offer_1.prog_course_offer; } });
const prog_grp_1 = require("./prog_grp");
Object.defineProperty(exports, "prog_grp", { enumerable: true, get: function () { return prog_grp_1.prog_grp; } });
const prog_grp_course_1 = require("./prog_grp_course");
Object.defineProperty(exports, "prog_grp_course", { enumerable: true, get: function () { return prog_grp_course_1.prog_grp_course; } });
const prog_staff_1 = require("./prog_staff");
Object.defineProperty(exports, "prog_staff", { enumerable: true, get: function () { return prog_staff_1.prog_staff; } });
const programme_1 = require("./programme");
Object.defineProperty(exports, "programme", { enumerable: true, get: function () { return programme_1.programme; } });
const report_1 = require("./report");
Object.defineProperty(exports, "report", { enumerable: true, get: function () { return report_1.report; } });
const semester_1 = require("./semester");
Object.defineProperty(exports, "semester", { enumerable: true, get: function () { return semester_1.semester; } });
const semester_course_1 = require("./semester_course");
Object.defineProperty(exports, "semester_course", { enumerable: true, get: function () { return semester_course_1.semester_course; } });
const semester_course_log_1 = require("./semester_course_log");
Object.defineProperty(exports, "semester_course_log", { enumerable: true, get: function () { return semester_course_log_1.semester_course_log; } });
const study_plan_1 = require("./study_plan");
Object.defineProperty(exports, "study_plan", { enumerable: true, get: function () { return study_plan_1.study_plan; } });
const study_plan_grp_1 = require("./study_plan_grp");
Object.defineProperty(exports, "study_plan_grp", { enumerable: true, get: function () { return study_plan_grp_1.study_plan_grp; } });
function initModels(sequelize) {
    const IDMap = IDMap_1.IDMap.initModel(sequelize);
    const account = account_1.account.initModel(sequelize);
    const cilo = cilo_1.cilo.initModel(sequelize);
    const cilo_at = cilo_at_1.cilo_at.initModel(sequelize);
    const cilo_tla = cilo_tla_1.cilo_tla.initModel(sequelize);
    const course = course_1.course.initModel(sequelize);
    const course_archive = course_archive_1.course_archive.initModel(sequelize);
    const course_at = course_at_1.course_at.initModel(sequelize);
    const course_detail = course_detail_1.course_detail.initModel(sequelize);
    const course_detail_log = course_detail_log_1.course_detail_log.initModel(sequelize);
    const course_staff = course_staff_1.course_staff.initModel(sequelize);
    const course_tla = course_tla_1.course_tla.initModel(sequelize);
    const django_migrations = django_migrations_1.django_migrations.initModel(sequelize);
    const people = people_1.people.initModel(sequelize);
    const pg_course_pilo = pg_course_pilo_1.pg_course_pilo.initModel(sequelize);
    const pilo = pilo_1.pilo.initModel(sequelize);
    const prog_course_offer = prog_course_offer_1.prog_course_offer.initModel(sequelize);
    const prog_grp = prog_grp_1.prog_grp.initModel(sequelize);
    const prog_grp_course = prog_grp_course_1.prog_grp_course.initModel(sequelize);
    const prog_staff = prog_staff_1.prog_staff.initModel(sequelize);
    const programme = programme_1.programme.initModel(sequelize);
    const report = report_1.report.initModel(sequelize);
    const semester = semester_1.semester.initModel(sequelize);
    const semester_course = semester_course_1.semester_course.initModel(sequelize);
    const semester_course_log = semester_course_log_1.semester_course_log.initModel(sequelize);
    const study_plan = study_plan_1.study_plan.initModel(sequelize);
    const study_plan_grp = study_plan_grp_1.study_plan_grp.initModel(sequelize);
    cilo.belongsToMany(course_at, {
        as: "course_at_id_course_ats",
        through: cilo_at,
        foreignKey: "cilo_id",
        otherKey: "course_at_id",
    });
    cilo.belongsToMany(course_tla, {
        as: "course_tla_id_course_tlas",
        through: cilo_tla,
        foreignKey: "cilo_id",
        otherKey: "course_tla_id",
    });
    course_at.belongsToMany(cilo, {
        as: "cilo_id_cilos",
        through: cilo_at,
        foreignKey: "course_at_id",
        otherKey: "cilo_id",
    });
    course_tla.belongsToMany(cilo, {
        as: "cilo_id_cilo_cilo_tlas",
        through: cilo_tla,
        foreignKey: "course_tla_id",
        otherKey: "cilo_id",
    });
    report.belongsTo(account, { as: "account", foreignKey: "account_id" });
    account.hasMany(report, { as: "reports", foreignKey: "account_id" });
    cilo_at.belongsTo(cilo, { as: "cilo", foreignKey: "cilo_id" });
    cilo.hasMany(cilo_at, { as: "cilo_ats", foreignKey: "cilo_id" });
    cilo_tla.belongsTo(cilo, { as: "cilo", foreignKey: "cilo_id" });
    cilo.hasMany(cilo_tla, { as: "cilo_tlas", foreignKey: "cilo_id" });
    course_detail.belongsTo(course, { as: "course", foreignKey: "course_id" });
    course.hasMany(course_detail, {
        as: "course_details",
        foreignKey: "course_id",
    });
    course_staff.belongsTo(course, { as: "course", foreignKey: "course_id" });
    course.hasMany(course_staff, { as: "course_staffs", foreignKey: "course_id" });
    pg_course_pilo.belongsTo(course, { as: "course", foreignKey: "course_id" });
    course.hasMany(pg_course_pilo, {
        as: "pg_course_pilos",
        foreignKey: "course_id",
    });
    prog_course_offer.belongsTo(course, { as: "course", foreignKey: "course_id" });
    course.hasMany(prog_course_offer, {
        as: "prog_course_offers",
        foreignKey: "course_id",
    });
    prog_grp_course.belongsTo(course, { as: "course", foreignKey: "course_id" });
    course.hasMany(prog_grp_course, {
        as: "prog_grp_courses",
        foreignKey: "course_id",
    });
    cilo_at.belongsTo(course_at, { as: "course_at", foreignKey: "course_at_id" });
    course_at.hasMany(cilo_at, { as: "cilo_ats", foreignKey: "course_at_id" });
    cilo.belongsTo(course_detail, {
        as: "course_detail",
        foreignKey: "course_detail_id",
    });
    course_detail.hasMany(cilo, { as: "cilos", foreignKey: "course_detail_id" });
    semester_course.belongsTo(course_detail, {
        as: "course_detail",
        foreignKey: "course_detail_id",
    });
    course_detail.hasMany(semester_course, {
        as: "semester_courses",
        foreignKey: "course_detail_id",
    });
    cilo_tla.belongsTo(course_tla, {
        as: "course_tla",
        foreignKey: "course_tla_id",
    });
    course_tla.hasMany(cilo_tla, { as: "cilo_tlas", foreignKey: "course_tla_id" });
    pg_course_pilo.belongsTo(pilo, { as: "pilo", foreignKey: "pilo_id" });
    pilo.hasMany(pg_course_pilo, { as: "pg_course_pilos", foreignKey: "pilo_id" });
    pg_course_pilo.belongsTo(prog_grp, {
        as: "prog_grp",
        foreignKey: "prog_grp_id",
    });
    prog_grp.hasMany(pg_course_pilo, {
        as: "pg_course_pilos",
        foreignKey: "prog_grp_id",
    });
    prog_grp_course.belongsTo(prog_grp, {
        as: "prog_grp",
        foreignKey: "prog_grp_id",
    });
    prog_grp.hasMany(prog_grp_course, {
        as: "prog_grp_courses",
        foreignKey: "prog_grp_id",
    });
    pilo.belongsTo(programme, { as: "programme", foreignKey: "programme_id" });
    programme.hasMany(pilo, { as: "pilos", foreignKey: "programme_id" });
    prog_course_offer.belongsTo(programme, {
        as: "programme",
        foreignKey: "programme_id",
    });
    programme.hasMany(prog_course_offer, {
        as: "prog_course_offers",
        foreignKey: "programme_id",
    });
    prog_grp.belongsTo(programme, { as: "programme", foreignKey: "programme_id" });
    programme.hasMany(prog_grp, { as: "prog_grps", foreignKey: "programme_id" });
    prog_staff.belongsTo(programme, {
        as: "programme",
        foreignKey: "programme_id",
    });
    programme.hasMany(prog_staff, {
        as: "prog_staffs",
        foreignKey: "programme_id",
    });
    study_plan.belongsTo(programme, {
        as: "programme",
        foreignKey: "programme_id",
    });
    programme.hasMany(study_plan, {
        as: "study_plans",
        foreignKey: "programme_id",
    });
    semester_course.belongsTo(semester, {
        as: "semester",
        foreignKey: "semester_id",
    });
    semester.hasMany(semester_course, {
        as: "semester_courses",
        foreignKey: "semester_id",
    });
    study_plan_grp.belongsTo(study_plan, {
        as: "study_plan",
        foreignKey: "study_plan_id",
    });
    study_plan.hasMany(study_plan_grp, {
        as: "study_plan_grps",
        foreignKey: "study_plan_id",
    });
    return {
        IDMap,
        account,
        cilo,
        cilo_at,
        cilo_tla,
        course,
        course_archive,
        course_at,
        course_detail,
        course_detail_log,
        course_staff,
        course_tla,
        django_migrations,
        people,
        pg_course_pilo,
        pilo,
        prog_course_offer,
        prog_grp,
        prog_grp_course,
        prog_staff,
        programme,
        report,
        semester,
        semester_course,
        semester_course_log,
        study_plan,
        study_plan_grp,
    };
}
exports.initModels = initModels;
exports.model = initModels(db_1.sequelize);
//# sourceMappingURL=init-models.js.map