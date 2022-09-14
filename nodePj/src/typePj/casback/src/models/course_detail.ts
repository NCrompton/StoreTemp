import * as Sequelize from "sequelize"
import { DataTypes, Model, Optional } from "sequelize"
import type { cilo, ciloId } from "./cilo"
import type { course, courseId } from "./course"
import type { semester_course, semester_courseId } from "./semester_course"

export interface course_detailAttributes {
	course_detail_id: number
	course_id: number
	name?: string
	credit?: number
	duration?: number
	level?: string
	medium?: string
	cw_percent?: number
	exam_percent?: number
	exam_duration?: number
	precursor?: string
	prerequisite?: string
	equivalent?: string
	exclusive?: string
	fund_mode?: string
	cef_course?: boolean
	block_transfer?: boolean
	remark?: string
	version?: number
	is_current?: number
	date_created: Date
	date_modified: Date
	grade_pattern?: string
	cohort_from: number
	cohort_to: number
	aim?: string
	grade_remark?: string
	kw_syllabus?: string
	syllabus?: string
	u_name: string
	r_host: string
	web_logon_name?: string
	web_logon_host?: string
	text_reading?: string
	online_reading?: string
	semester_id?: number
	equivalent_old?: string
	/* timestamp: Date */
}

export type course_detailPk = "course_detail_id"
export type course_detailId = course_detail[course_detailPk]
export type course_detailOptionalAttributes =
	| "course_detail_id"
	| "name"
	| "credit"
	| "duration"
	| "level"
	| "medium"
	| "cw_percent"
	| "exam_percent"
	| "exam_duration"
	| "precursor"
	| "prerequisite"
	| "equivalent"
	| "exclusive"
	| "fund_mode"
	| "cef_course"
	| "block_transfer"
	| "remark"
	| "version"
	| "is_current"
	| "date_created"
	| "date_modified"
	| "grade_pattern"
	| "cohort_from"
	| "cohort_to"
	| "aim"
	| "grade_remark"
	| "kw_syllabus"
	| "syllabus"
	| "u_name"
	| "r_host"
	| "web_logon_name"
	| "web_logon_host"
	| "text_reading"
	| "online_reading"
	| "semester_id"
	| "equivalent_old"
export type course_detailCreationAttributes = Optional<
	course_detailAttributes,
	course_detailOptionalAttributes
>

export class course_detail
	extends Model<course_detailAttributes, course_detailCreationAttributes>
	implements course_detailAttributes
{
	course_detail_id!: number
	course_id!: number
	name?: string
	credit?: number
	duration?: number
	level?: string
	medium?: string
	cw_percent?: number
	exam_percent?: number
	exam_duration?: number
	precursor?: string
	prerequisite?: string
	equivalent?: string
	exclusive?: string
	fund_mode?: string
	cef_course?: boolean
	block_transfer?: boolean
	remark?: string
	version?: number
	is_current?: number
	date_created!: Date
	date_modified!: Date
	grade_pattern?: string
	cohort_from!: number
	cohort_to!: number
	aim?: string
	grade_remark?: string
	kw_syllabus?: string
	syllabus?: string
	u_name!: string
	r_host!: string
	web_logon_name?: string
	web_logon_host?: string
	text_reading?: string
	online_reading?: string
	semester_id?: number
	equivalent_old?: string
	/* 	timestamp!: Date */

	// course_detail belongsTo course via course_id
	course!: course
	getCourse!: Sequelize.BelongsToGetAssociationMixin<course>
	setCourse!: Sequelize.BelongsToSetAssociationMixin<course, courseId>
	createCourse!: Sequelize.BelongsToCreateAssociationMixin<course>
	// course_detail hasMany cilo via course_detail_id
	cilos!: cilo[]
	getCilos!: Sequelize.HasManyGetAssociationsMixin<cilo>
	setCilos!: Sequelize.HasManySetAssociationsMixin<cilo, ciloId>
	addCilo!: Sequelize.HasManyAddAssociationMixin<cilo, ciloId>
	addCilos!: Sequelize.HasManyAddAssociationsMixin<cilo, ciloId>
	createCilo!: Sequelize.HasManyCreateAssociationMixin<cilo>
	removeCilo!: Sequelize.HasManyRemoveAssociationMixin<cilo, ciloId>
	removeCilos!: Sequelize.HasManyRemoveAssociationsMixin<cilo, ciloId>
	hasCilo!: Sequelize.HasManyHasAssociationMixin<cilo, ciloId>
	hasCilos!: Sequelize.HasManyHasAssociationsMixin<cilo, ciloId>
	countCilos!: Sequelize.HasManyCountAssociationsMixin
	// course_detail hasMany semester_course via course_detail_id
	semester_courses!: semester_course[]
	getSemester_courses!: Sequelize.HasManyGetAssociationsMixin<semester_course>
	setSemester_courses!: Sequelize.HasManySetAssociationsMixin<
		semester_course,
		semester_courseId
	>
	addSemester_course!: Sequelize.HasManyAddAssociationMixin<
		semester_course,
		semester_courseId
	>
	addSemester_courses!: Sequelize.HasManyAddAssociationsMixin<
		semester_course,
		semester_courseId
	>
	createSemester_course!: Sequelize.HasManyCreateAssociationMixin<semester_course>
	removeSemester_course!: Sequelize.HasManyRemoveAssociationMixin<
		semester_course,
		semester_courseId
	>
	removeSemester_courses!: Sequelize.HasManyRemoveAssociationsMixin<
		semester_course,
		semester_courseId
	>
	hasSemester_course!: Sequelize.HasManyHasAssociationMixin<
		semester_course,
		semester_courseId
	>
	hasSemester_courses!: Sequelize.HasManyHasAssociationsMixin<
		semester_course,
		semester_courseId
	>
	countSemester_courses!: Sequelize.HasManyCountAssociationsMixin

	static initModel(sequelize: Sequelize.Sequelize): typeof course_detail {
		return course_detail.init(
			{
				course_detail_id: {
					autoIncrement: true,
					type: DataTypes.INTEGER,
					allowNull: false,
					primaryKey: true,
				},
				course_id: {
					type: DataTypes.INTEGER,
					allowNull: false,
					references: {
						model: "course",
						key: "course_id",
					},
				},
				name: {
					type: DataTypes.STRING(100),
					allowNull: true,
				},
				credit: {
					type: DataTypes.INTEGER,
					allowNull: true,
				},
				duration: {
					type: DataTypes.INTEGER,
					allowNull: true,
				},
				level: {
					type: DataTypes.STRING(5),
					allowNull: true,
				},
				medium: {
					type: DataTypes.STRING(20),
					allowNull: true,
				},
				cw_percent: {
					type: DataTypes.INTEGER,
					allowNull: true,
				},
				exam_percent: {
					type: DataTypes.INTEGER,
					allowNull: true,
				},
				exam_duration: {
					type: DataTypes.INTEGER,
					allowNull: true,
				},
				precursor: {
					type: DataTypes.TEXT,
					allowNull: true,
				},
				prerequisite: {
					type: DataTypes.TEXT,
					allowNull: true,
				},
				equivalent: {
					type: DataTypes.TEXT,
					allowNull: true,
				},
				exclusive: {
					type: DataTypes.TEXT,
					allowNull: true,
				},
				fund_mode: {
					type: DataTypes.STRING(25),
					allowNull: true,
				},
				cef_course: {
					type: DataTypes.BOOLEAN,
					allowNull: true,
				},
				block_transfer: {
					type: DataTypes.BOOLEAN,
					allowNull: true,
				},
				remark: {
					type: DataTypes.TEXT,
					allowNull: true,
				},
				version: {
					type: DataTypes.SMALLINT,
					allowNull: true,
				},
				is_current: {
					type: DataTypes.SMALLINT,
					allowNull: true,
				},
				date_created: {
					type: DataTypes.DATE,
					allowNull: false,
					defaultValue: Sequelize.Sequelize.fn("getdate"),
				},
				date_modified: {
					type: DataTypes.DATE,
					allowNull: false,
					defaultValue: Sequelize.Sequelize.fn("getdate"),
				},
				grade_pattern: {
					type: DataTypes.STRING(20),
					allowNull: true,
				},
				cohort_from: {
					type: DataTypes.INTEGER,
					allowNull: false,
					defaultValue: 0,
				},
				cohort_to: {
					type: DataTypes.INTEGER,
					allowNull: false,
					defaultValue: 0,
				},
				aim: {
					type: DataTypes.TEXT,
					allowNull: true,
				},
				grade_remark: {
					type: DataTypes.TEXT,
					allowNull: true,
				},
				kw_syllabus: {
					type: DataTypes.TEXT,
					allowNull: true,
				},
				syllabus: {
					type: DataTypes.TEXT,
					allowNull: true,
				},
				u_name: {
					type: DataTypes.STRING(50),
					allowNull: false,
					defaultValue: Sequelize.Sequelize.fn("suser_sname"),
				},
				r_host: {
					type: DataTypes.STRING(50),
					allowNull: false,
					defaultValue: Sequelize.Sequelize.fn("host_name"),
				},
				web_logon_name: {
					type: DataTypes.STRING(50),
					allowNull: true,
				},
				web_logon_host: {
					type: DataTypes.STRING(150),
					allowNull: true,
				},
				text_reading: {
					type: DataTypes.TEXT,
					allowNull: true,
				},
				online_reading: {
					type: DataTypes.TEXT,
					allowNull: true,
				},
				semester_id: {
					type: DataTypes.INTEGER,
					allowNull: true,
				},
				equivalent_old: {
					type: DataTypes.TEXT,
					allowNull: true,
				},
				/* timestamp: {
					type: DataTypes.DATE,
					allowNull: true,
				}, */
			},
			{
				sequelize,
				tableName: "course_detail",
				schema: "dbo",
				hasTrigger: true,
				timestamps: false,
				indexes: [
					{
						name: "PK_course_detail",
						unique: true,
						fields: [{ name: "course_detail_id" }],
					},
				],
			}
		)
	}
}
