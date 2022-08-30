import type { Sequelize } from "sequelize"
import { sequelize } from "../utils/db"
import { IDMap as _IDMap } from "./IDMap"
import type { IDMapAttributes, IDMapCreationAttributes } from "./IDMap"
import { account as _account } from "./account"
import type { accountAttributes, accountCreationAttributes } from "./account"
import { cilo as _cilo } from "./cilo"
import type { ciloAttributes, ciloCreationAttributes } from "./cilo"
import { cilo_at as _cilo_at } from "./cilo_at"
import type { cilo_atAttributes, cilo_atCreationAttributes } from "./cilo_at"
import { cilo_tla as _cilo_tla } from "./cilo_tla"
import type { cilo_tlaAttributes, cilo_tlaCreationAttributes } from "./cilo_tla"
import { course as _course } from "./course"
import type { courseAttributes, courseCreationAttributes } from "./course"
import { course_archive as _course_archive } from "./course_archive"
import type {
	course_archiveAttributes,
	course_archiveCreationAttributes,
} from "./course_archive"
import { course_at as _course_at } from "./course_at"
import type {
	course_atAttributes,
	course_atCreationAttributes,
} from "./course_at"
import { course_detail as _course_detail } from "./course_detail"
import type {
	course_detailAttributes,
	course_detailCreationAttributes,
} from "./course_detail"
import { course_detail_log as _course_detail_log } from "./course_detail_log"
import type {
	course_detail_logAttributes,
	course_detail_logCreationAttributes,
} from "./course_detail_log"
import { course_staff as _course_staff } from "./course_staff"
import type {
	course_staffAttributes,
	course_staffCreationAttributes,
} from "./course_staff"
import { course_tla as _course_tla } from "./course_tla"
import type {
	course_tlaAttributes,
	course_tlaCreationAttributes,
} from "./course_tla"
import { django_migrations as _django_migrations } from "./django_migrations"
import type {
	django_migrationsAttributes,
	django_migrationsCreationAttributes,
} from "./django_migrations"
import { people as _people } from "./people"
import type { peopleAttributes, peopleCreationAttributes } from "./people"
import { pg_course_pilo as _pg_course_pilo } from "./pg_course_pilo"
import type {
	pg_course_piloAttributes,
	pg_course_piloCreationAttributes,
} from "./pg_course_pilo"
import { pilo as _pilo } from "./pilo"
import type { piloAttributes, piloCreationAttributes } from "./pilo"
import { prog_course_offer as _prog_course_offer } from "./prog_course_offer"
import type {
	prog_course_offerAttributes,
	prog_course_offerCreationAttributes,
} from "./prog_course_offer"
import { prog_grp as _prog_grp } from "./prog_grp"
import type { prog_grpAttributes, prog_grpCreationAttributes } from "./prog_grp"
import { prog_grp_course as _prog_grp_course } from "./prog_grp_course"
import type {
	prog_grp_courseAttributes,
	prog_grp_courseCreationAttributes,
} from "./prog_grp_course"
import { prog_staff as _prog_staff } from "./prog_staff"
import type {
	prog_staffAttributes,
	prog_staffCreationAttributes,
} from "./prog_staff"
import { programme as _programme } from "./programme"
import type {
	programmeAttributes,
	programmeCreationAttributes,
} from "./programme"
import { report as _report } from "./report"
import type { reportAttributes, reportCreationAttributes } from "./report"
import { semester as _semester } from "./semester"
import type { semesterAttributes, semesterCreationAttributes } from "./semester"
import { semester_course as _semester_course } from "./semester_course"
import type {
	semester_courseAttributes,
	semester_courseCreationAttributes,
} from "./semester_course"
import { semester_course_log as _semester_course_log } from "./semester_course_log"
import type {
	semester_course_logAttributes,
	semester_course_logCreationAttributes,
} from "./semester_course_log"
import { study_plan as _study_plan } from "./study_plan"
import type {
	study_planAttributes,
	study_planCreationAttributes,
} from "./study_plan"
import { study_plan_grp as _study_plan_grp } from "./study_plan_grp"
import type {
	study_plan_grpAttributes,
	study_plan_grpCreationAttributes,
} from "./study_plan_grp"

export {
	_IDMap as IDMap,
	_account as account,
	_cilo as cilo,
	_cilo_at as cilo_at,
	_cilo_tla as cilo_tla,
	_course as course,
	_course_archive as course_archive,
	_course_at as course_at,
	_course_detail as course_detail,
	_course_detail_log as course_detail_log,
	_course_staff as course_staff,
	_course_tla as course_tla,
	_django_migrations as django_migrations,
	_people as people,
	_pg_course_pilo as pg_course_pilo,
	_pilo as pilo,
	_prog_course_offer as prog_course_offer,
	_prog_grp as prog_grp,
	_prog_grp_course as prog_grp_course,
	_prog_staff as prog_staff,
	_programme as programme,
	_report as report,
	_semester as semester,
	_semester_course as semester_course,
	_semester_course_log as semester_course_log,
	_study_plan as study_plan,
	_study_plan_grp as study_plan_grp,
}

export type {
	IDMapAttributes,
	IDMapCreationAttributes,
	accountAttributes,
	accountCreationAttributes,
	ciloAttributes,
	ciloCreationAttributes,
	cilo_atAttributes,
	cilo_atCreationAttributes,
	cilo_tlaAttributes,
	cilo_tlaCreationAttributes,
	courseAttributes,
	courseCreationAttributes,
	course_archiveAttributes,
	course_archiveCreationAttributes,
	course_atAttributes,
	course_atCreationAttributes,
	course_detailAttributes,
	course_detailCreationAttributes,
	course_detail_logAttributes,
	course_detail_logCreationAttributes,
	course_staffAttributes,
	course_staffCreationAttributes,
	course_tlaAttributes,
	course_tlaCreationAttributes,
	django_migrationsAttributes,
	django_migrationsCreationAttributes,
	peopleAttributes,
	peopleCreationAttributes,
	pg_course_piloAttributes,
	pg_course_piloCreationAttributes,
	piloAttributes,
	piloCreationAttributes,
	prog_course_offerAttributes,
	prog_course_offerCreationAttributes,
	prog_grpAttributes,
	prog_grpCreationAttributes,
	prog_grp_courseAttributes,
	prog_grp_courseCreationAttributes,
	prog_staffAttributes,
	prog_staffCreationAttributes,
	programmeAttributes,
	programmeCreationAttributes,
	reportAttributes,
	reportCreationAttributes,
	semesterAttributes,
	semesterCreationAttributes,
	semester_courseAttributes,
	semester_courseCreationAttributes,
	semester_course_logAttributes,
	semester_course_logCreationAttributes,
	study_planAttributes,
	study_planCreationAttributes,
	study_plan_grpAttributes,
	study_plan_grpCreationAttributes,
}

export function initModels(sequelize: Sequelize) {
	const IDMap = _IDMap.initModel(sequelize)
	const account = _account.initModel(sequelize)
	const cilo = _cilo.initModel(sequelize)
	const cilo_at = _cilo_at.initModel(sequelize)
	const cilo_tla = _cilo_tla.initModel(sequelize)
	const course = _course.initModel(sequelize)
	const course_archive = _course_archive.initModel(sequelize)
	const course_at = _course_at.initModel(sequelize)
	const course_detail = _course_detail.initModel(sequelize)
	const course_detail_log = _course_detail_log.initModel(sequelize)
	const course_staff = _course_staff.initModel(sequelize)
	const course_tla = _course_tla.initModel(sequelize)
	const django_migrations = _django_migrations.initModel(sequelize)
	const people = _people.initModel(sequelize)
	const pg_course_pilo = _pg_course_pilo.initModel(sequelize)
	const pilo = _pilo.initModel(sequelize)
	const prog_course_offer = _prog_course_offer.initModel(sequelize)
	const prog_grp = _prog_grp.initModel(sequelize)
	const prog_grp_course = _prog_grp_course.initModel(sequelize)
	const prog_staff = _prog_staff.initModel(sequelize)
	const programme = _programme.initModel(sequelize)
	const report = _report.initModel(sequelize)
	const semester = _semester.initModel(sequelize)
	const semester_course = _semester_course.initModel(sequelize)
	const semester_course_log = _semester_course_log.initModel(sequelize)
	const study_plan = _study_plan.initModel(sequelize)
	const study_plan_grp = _study_plan_grp.initModel(sequelize)

	cilo.belongsToMany(course_at, {
		as: "course_at_id_course_ats",
		through: cilo_at,
		foreignKey: "cilo_id",
		otherKey: "course_at_id",
	})
	cilo.belongsToMany(course_tla, {
		as: "course_tla_id_course_tlas",
		through: cilo_tla,
		foreignKey: "cilo_id",
		otherKey: "course_tla_id",
	})
	course_at.belongsToMany(cilo, {
		as: "cilo_id_cilos",
		through: cilo_at,
		foreignKey: "course_at_id",
		otherKey: "cilo_id",
	})
	course_tla.belongsToMany(cilo, {
		as: "cilo_id_cilo_cilo_tlas",
		through: cilo_tla,
		foreignKey: "course_tla_id",
		otherKey: "cilo_id",
	})
	report.belongsTo(account, { as: "account", foreignKey: "account_id" })
	account.hasMany(report, { as: "reports", foreignKey: "account_id" })
	cilo_at.belongsTo(cilo, { as: "cilo", foreignKey: "cilo_id" })
	cilo.hasMany(cilo_at, { as: "cilo_ats", foreignKey: "cilo_id" })
	cilo_tla.belongsTo(cilo, { as: "cilo", foreignKey: "cilo_id" })
	cilo.hasMany(cilo_tla, { as: "cilo_tlas", foreignKey: "cilo_id" })
	course_detail.belongsTo(course, { as: "course", foreignKey: "course_id" })
	course.hasMany(course_detail, {
		as: "course_details",
		foreignKey: "course_id",
	})
	course_staff.belongsTo(course, { as: "course", foreignKey: "course_id" })
	course.hasMany(course_staff, { as: "course_staffs", foreignKey: "course_id" })
	pg_course_pilo.belongsTo(course, { as: "course", foreignKey: "course_id" })
	course.hasMany(pg_course_pilo, {
		as: "pg_course_pilos",
		foreignKey: "course_id",
	})
	prog_course_offer.belongsTo(course, { as: "course", foreignKey: "course_id" })
	course.hasMany(prog_course_offer, {
		as: "prog_course_offers",
		foreignKey: "course_id",
	})
	prog_grp_course.belongsTo(course, { as: "course", foreignKey: "course_id" })
	course.hasMany(prog_grp_course, {
		as: "prog_grp_courses",
		foreignKey: "course_id",
	})
	cilo_at.belongsTo(course_at, { as: "course_at", foreignKey: "course_at_id" })
	course_at.hasMany(cilo_at, { as: "cilo_ats", foreignKey: "course_at_id" })
	cilo.belongsTo(course_detail, {
		as: "course_detail",
		foreignKey: "course_detail_id",
	})
	course_detail.hasMany(cilo, { as: "cilos", foreignKey: "course_detail_id" })
	semester_course.belongsTo(course_detail, {
		as: "course_detail",
		foreignKey: "course_detail_id",
	})
	course_detail.hasMany(semester_course, {
		as: "semester_courses",
		foreignKey: "course_detail_id",
	})
	cilo_tla.belongsTo(course_tla, {
		as: "course_tla",
		foreignKey: "course_tla_id",
	})
	course_tla.hasMany(cilo_tla, { as: "cilo_tlas", foreignKey: "course_tla_id" })
	pg_course_pilo.belongsTo(pilo, { as: "pilo", foreignKey: "pilo_id" })
	pilo.hasMany(pg_course_pilo, { as: "pg_course_pilos", foreignKey: "pilo_id" })
	pg_course_pilo.belongsTo(prog_grp, {
		as: "prog_grp",
		foreignKey: "prog_grp_id",
	})
	prog_grp.hasMany(pg_course_pilo, {
		as: "pg_course_pilos",
		foreignKey: "prog_grp_id",
	})
	prog_grp_course.belongsTo(prog_grp, {
		as: "prog_grp",
		foreignKey: "prog_grp_id",
	})
	prog_grp.hasMany(prog_grp_course, {
		as: "prog_grp_courses",
		foreignKey: "prog_grp_id",
	})
	pilo.belongsTo(programme, { as: "programme", foreignKey: "programme_id" })
	programme.hasMany(pilo, { as: "pilos", foreignKey: "programme_id" })
	prog_course_offer.belongsTo(programme, {
		as: "programme",
		foreignKey: "programme_id",
	})
	programme.hasMany(prog_course_offer, {
		as: "prog_course_offers",
		foreignKey: "programme_id",
	})
	prog_grp.belongsTo(programme, { as: "programme", foreignKey: "programme_id" })
	programme.hasMany(prog_grp, { as: "prog_grps", foreignKey: "programme_id" })
	prog_staff.belongsTo(programme, {
		as: "programme",
		foreignKey: "programme_id",
	})
	programme.hasMany(prog_staff, {
		as: "prog_staffs",
		foreignKey: "programme_id",
	})
	study_plan.belongsTo(programme, {
		as: "programme",
		foreignKey: "programme_id",
	})
	programme.hasMany(study_plan, {
		as: "study_plans",
		foreignKey: "programme_id",
	})
	semester_course.belongsTo(semester, {
		as: "semester",
		foreignKey: "semester_id",
	})
	semester.hasMany(semester_course, {
		as: "semester_courses",
		foreignKey: "semester_id",
	})
	study_plan_grp.belongsTo(study_plan, {
		as: "study_plan",
		foreignKey: "study_plan_id",
	})
	study_plan.hasMany(study_plan_grp, {
		as: "study_plan_grps",
		foreignKey: "study_plan_id",
	})

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
	}
}

export const model = initModels(sequelize)
