import * as Sequelize from "sequelize"
import { DataTypes, Model, Optional } from "sequelize"
import type { course_detail, course_detailId } from "./course_detail"
import type { course_staff, course_staffId } from "./course_staff"
import type { pg_course_pilo, pg_course_piloId } from "./pg_course_pilo"
import type {
	prog_course_offer,
	prog_course_offerId,
} from "./prog_course_offer"
import type { prog_grp_course, prog_grp_courseId } from "./prog_grp_course"

export interface courseAttributes {
	course_id: number
	code?: string
	dept?: string
	website?: string
	date_created: Date
	date_modified: Date
	subject_area?: string
}

export type coursePk = "course_id"
export type courseId = course[coursePk]
export type courseOptionalAttributes =
	| "course_id"
	| "code"
	| "dept"
	| "website"
	| "date_created"
	| "date_modified"
	| "subject_area"
export type courseCreationAttributes = Optional<
	courseAttributes,
	courseOptionalAttributes
>

export class course
	extends Model<courseAttributes, courseCreationAttributes>
	implements courseAttributes
{
	course_id!: number
	code?: string
	dept?: string
	website?: string
	date_created!: Date
	date_modified!: Date
	subject_area?: string

	// course hasMany course_detail via course_id
	course_details!: course_detail[]
	getCourse_details!: Sequelize.HasManyGetAssociationsMixin<course_detail>
	setCourse_details!: Sequelize.HasManySetAssociationsMixin<
		course_detail,
		course_detailId
	>
	addCourse_detail!: Sequelize.HasManyAddAssociationMixin<
		course_detail,
		course_detailId
	>
	addCourse_details!: Sequelize.HasManyAddAssociationsMixin<
		course_detail,
		course_detailId
	>
	createCourse_detail!: Sequelize.HasManyCreateAssociationMixin<course_detail>
	removeCourse_detail!: Sequelize.HasManyRemoveAssociationMixin<
		course_detail,
		course_detailId
	>
	removeCourse_details!: Sequelize.HasManyRemoveAssociationsMixin<
		course_detail,
		course_detailId
	>
	hasCourse_detail!: Sequelize.HasManyHasAssociationMixin<
		course_detail,
		course_detailId
	>
	hasCourse_details!: Sequelize.HasManyHasAssociationsMixin<
		course_detail,
		course_detailId
	>
	countCourse_details!: Sequelize.HasManyCountAssociationsMixin
	// course hasMany course_staff via course_id
	course_staffs!: course_staff[]
	getCourse_staffs!: Sequelize.HasManyGetAssociationsMixin<course_staff>
	setCourse_staffs!: Sequelize.HasManySetAssociationsMixin<
		course_staff,
		course_staffId
	>
	addCourse_staff!: Sequelize.HasManyAddAssociationMixin<
		course_staff,
		course_staffId
	>
	addCourse_staffs!: Sequelize.HasManyAddAssociationsMixin<
		course_staff,
		course_staffId
	>
	createCourse_staff!: Sequelize.HasManyCreateAssociationMixin<course_staff>
	removeCourse_staff!: Sequelize.HasManyRemoveAssociationMixin<
		course_staff,
		course_staffId
	>
	removeCourse_staffs!: Sequelize.HasManyRemoveAssociationsMixin<
		course_staff,
		course_staffId
	>
	hasCourse_staff!: Sequelize.HasManyHasAssociationMixin<
		course_staff,
		course_staffId
	>
	hasCourse_staffs!: Sequelize.HasManyHasAssociationsMixin<
		course_staff,
		course_staffId
	>
	countCourse_staffs!: Sequelize.HasManyCountAssociationsMixin
	// course hasMany pg_course_pilo via course_id
	pg_course_pilos!: pg_course_pilo[]
	getPg_course_pilos!: Sequelize.HasManyGetAssociationsMixin<pg_course_pilo>
	setPg_course_pilos!: Sequelize.HasManySetAssociationsMixin<
		pg_course_pilo,
		pg_course_piloId
	>
	addPg_course_pilo!: Sequelize.HasManyAddAssociationMixin<
		pg_course_pilo,
		pg_course_piloId
	>
	addPg_course_pilos!: Sequelize.HasManyAddAssociationsMixin<
		pg_course_pilo,
		pg_course_piloId
	>
	createPg_course_pilo!: Sequelize.HasManyCreateAssociationMixin<pg_course_pilo>
	removePg_course_pilo!: Sequelize.HasManyRemoveAssociationMixin<
		pg_course_pilo,
		pg_course_piloId
	>
	removePg_course_pilos!: Sequelize.HasManyRemoveAssociationsMixin<
		pg_course_pilo,
		pg_course_piloId
	>
	hasPg_course_pilo!: Sequelize.HasManyHasAssociationMixin<
		pg_course_pilo,
		pg_course_piloId
	>
	hasPg_course_pilos!: Sequelize.HasManyHasAssociationsMixin<
		pg_course_pilo,
		pg_course_piloId
	>
	countPg_course_pilos!: Sequelize.HasManyCountAssociationsMixin
	// course hasMany prog_course_offer via course_id
	prog_course_offers!: prog_course_offer[]
	getProg_course_offers!: Sequelize.HasManyGetAssociationsMixin<prog_course_offer>
	setProg_course_offers!: Sequelize.HasManySetAssociationsMixin<
		prog_course_offer,
		prog_course_offerId
	>
	addProg_course_offer!: Sequelize.HasManyAddAssociationMixin<
		prog_course_offer,
		prog_course_offerId
	>
	addProg_course_offers!: Sequelize.HasManyAddAssociationsMixin<
		prog_course_offer,
		prog_course_offerId
	>
	createProg_course_offer!: Sequelize.HasManyCreateAssociationMixin<prog_course_offer>
	removeProg_course_offer!: Sequelize.HasManyRemoveAssociationMixin<
		prog_course_offer,
		prog_course_offerId
	>
	removeProg_course_offers!: Sequelize.HasManyRemoveAssociationsMixin<
		prog_course_offer,
		prog_course_offerId
	>
	hasProg_course_offer!: Sequelize.HasManyHasAssociationMixin<
		prog_course_offer,
		prog_course_offerId
	>
	hasProg_course_offers!: Sequelize.HasManyHasAssociationsMixin<
		prog_course_offer,
		prog_course_offerId
	>
	countProg_course_offers!: Sequelize.HasManyCountAssociationsMixin
	// course hasMany prog_grp_course via course_id
	prog_grp_courses!: prog_grp_course[]
	getProg_grp_courses!: Sequelize.HasManyGetAssociationsMixin<prog_grp_course>
	setProg_grp_courses!: Sequelize.HasManySetAssociationsMixin<
		prog_grp_course,
		prog_grp_courseId
	>
	addProg_grp_course!: Sequelize.HasManyAddAssociationMixin<
		prog_grp_course,
		prog_grp_courseId
	>
	addProg_grp_courses!: Sequelize.HasManyAddAssociationsMixin<
		prog_grp_course,
		prog_grp_courseId
	>
	createProg_grp_course!: Sequelize.HasManyCreateAssociationMixin<prog_grp_course>
	removeProg_grp_course!: Sequelize.HasManyRemoveAssociationMixin<
		prog_grp_course,
		prog_grp_courseId
	>
	removeProg_grp_courses!: Sequelize.HasManyRemoveAssociationsMixin<
		prog_grp_course,
		prog_grp_courseId
	>
	hasProg_grp_course!: Sequelize.HasManyHasAssociationMixin<
		prog_grp_course,
		prog_grp_courseId
	>
	hasProg_grp_courses!: Sequelize.HasManyHasAssociationsMixin<
		prog_grp_course,
		prog_grp_courseId
	>
	countProg_grp_courses!: Sequelize.HasManyCountAssociationsMixin

	static initModel(sequelize: Sequelize.Sequelize): typeof course {
		return course.init(
			{
				course_id: {
					autoIncrement: true,
					type: DataTypes.INTEGER,
					allowNull: false,
					primaryKey: true,
					validate: {
						isInt: true,
					},
				},
				code: {
					type: DataTypes.STRING(10),
					allowNull: true,
					unique: "UK_course",
					validate: {
						len: [1, 1],
					},
				},
				dept: {
					type: DataTypes.STRING(10),
					allowNull: true,
				},
				website: {
					type: DataTypes.STRING(250),
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
				subject_area: {
					type: DataTypes.STRING(20),
					allowNull: true,
				},
			},
			{
				sequelize,
				tableName: "course",
				schema: "dbo",
				timestamps: false,
				indexes: [
					{
						name: "PK__course__8F1EF7AE60A75C0F",
						unique: true,
						fields: [{ name: "course_id" }],
					},
					{
						name: "UK_course",
						unique: true,
						fields: [{ name: "code" }],
					},
				],
			}
		)
	}
}
