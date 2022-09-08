import { NextFunction, Request, Response } from "express"
import { model, course_detail } from "../models/init-models"
import { Op } from "sequelize"

type CourseResponse = {
	status: number
	data: Array<course_detail>
	error?: string
}
const _model_class = course_detail
type _model_type = course_detail
const SQL = model.course_detail
const defaultSearch = [
	"course_id",
	"course_detail_id",
	"name",
	"credit",
	"duration",
	"level",
	"medium",
	"cw_percent",
	"exam_duration",
	"precursor",
	"prerequisite",
	"equivalent",
	"exclusive",
	"version",
	"cohort_from",
	"cohort_to",
]
type _model_partial = {
	[P in keyof _model_type]?: _model_type[P] | null
}
const id = "course_detail_id"

export async function getCourseDetail(req: Request, res: Response) {
	const result = await findAllData(undefined, ["name", "version"])
	const status = 200
	res.status(status).json(result)
}

export async function getCourseDetailById(req: Request, res: Response) {}

function checkUnusedParam(params: { [key: string]: any }) {
	const list = _model_class.getAttributes()
	let unusedList = []
	for (const [k] of Object.entries(params)) {
		if (!Object.keys(list).includes(k)) {
			unusedList.push({ value: k })
		}
	}
	return unusedList.length > 0 ? unusedList : false
}

async function checkUniqueParam(params: { [key: string]: any }) {
	let result = true
	/* if (params.hasOwnProperty("course_detail_id")) {
		result =
			(await SQL.count({
				where: { course_detail_id: params.course_detail_id },
			})) === 0 && result
	} */
	return result
}

function hasUniqueParam(params: {}) {
	return false
}

function nonNullParams(params: { [key: string]: any }) {
	params.credit ?? Object.assign(params, { credit: 3 })
	params.duration ?? Object.assign(params, { duration: 1 })
	params.medium ?? Object.assign(params, { medium: "English" })
	params.cw_percent ??
		Object.assign(params, { cw_percent: 100, exam_percent: 0 })
	params.exam_duration ?? Object.assign(params, { exam_duration: 100 })
	params.precursor ?? Object.assign(params, { precursor: "" })
	params.prerequisite ?? Object.assign(params, { prerequisite: "" })
	params.equivalent ?? Object.assign(params, { equivalent: "" })
	params.exclusive ?? Object.assign(params, { exclusive: "" })
	params.fund_mode ?? Object.assign(params, { fund_mode: "" })
	params.cef_course ?? Object.assign(params, { cef_course: 0 })
	params.block_transfer ?? Object.assign(params, { block_transfer: 0 })
	params.remark ?? Object.assign(params, { remark: "" })
	params.version ?? Object.assign(params, { version: 1 })
	params.is_current ?? Object.assign(params, { is_current: 1 })
	params.grade_pattern ??
		Object.assign(params, { grade_pattern: "Standard (A+AA-...F)" })
	params.chort_to ?? Object.assign(params, { cohort_to: 0 })
	params.u_name ?? Object.assign(params, { u_name: "CASback" })
	params.r_host ?? Object.assign(params, { r_host: "CASback" })
	return params
}

function checkDataChanges(params: { [key: string]: any }, data: _model_type) {
	const attributes: object = _model_class.getAttributes()
	for (const [k, v] of Object.entries(params)) {
		if (Object.keys(attributes).includes(k)) {
			if (data.get(k) !== v) {
				return true
			}
		}
	}
	return false
}

function checkRequiredParam(params: { [key: string]: any }) {
	return (
		params.hasOwnProperty("course_id") &&
		params.hasOwnProperty("name") &&
		params.hasOwnProperty("level") &&
		params.hasOwnProperty("cohort_from")
	)
}

function checkValidParam(
	params:
		| {
				[key: string]: any
		  }
		| Array<string>
): Array<string> | undefined {
	if (params === undefined) return undefined
	const attributes = _model_class.getAttributes()
	const paramList: Array<string> =
		params instanceof Array<string> ? params : Object.keys(params)
	const list = paramList
		?.map((m: string) => {
			if (m in attributes) return m
		})
		.filter((m) => m !== undefined)
	return list?.length > 0 ? list : undefined
}

function createWhereStatement(
	params: { [key: string]: any },
	restore?: boolean /* ignored active if true */
) {
	let wherestate: { [key: string]: any } = {}
	const attributes: Array<string> = ["name", "id", "course_id"]
	for (let i of attributes) {
		if (!(params[i] === undefined || params[i] === "!"))
			wherestate[i] = params[i]
	}
	/* const ignoreInactive: boolean = restore ?? false
	params.id === "!" || Object.assign(wherestate, { course_id: params.id })
	params.name === "!" ||
		params.name === undefined ||
		Object.assign(wherestate, { name: params.name })
	params.dept === "!" ||
		params.dept === undefined ||
		Object.assign(wherestate, { dept: params.dept })
	params.subject_area === "!" ||
		params.subject_area === undefined ||
		Object.assign(wherestate, { dept: params.subject_area })
	/* unselect inactive entries 
	ignoreInactive ||
		Object.assign(wherestate, { website: { [Op.not]: "inactive" } })
 */
	return wherestate
}

function checkIDType({ id, course_id, version }: { [key: string]: string }) {
	const _id = id ?? 0
	const _course_id = course_id ?? 0
	const _version = version ?? 0
	if (Number.isNaN(Number(_id)) && _id !== "!") {
		return false
	}
	if (Number.isNaN(Number(_course_id)) && _course_id !== "!") {
		return false
	}
	if (Number.isNaN(Number(_version)) && _version !== "!") {
		return false
	}
	return true
}

function checkAllTypes(params: {
	[key: string]: any
}): boolean | string | number | object {
	const numberList: Array<string> = [
		"course_id",
		"credit",
		"duration",
		"cw_percent",
		"exam_duration",
		"version",
		"is_current",
		"cohort_from",
		"cohort_to",
	]
	const stringList: Array<string> = [
		"name",
		"level",
		"medium",
		"precursor",
		"prerequisite",
		"equivalent",
		"exclusive",
		"grade_pattern",
		"u_name",
		"r_host",
	]
	const objectList: Array<string> = []
	const booleanList: Array<string> = []
	for (const [k, v] of Object.entries(params)) {
		if (numberList.includes(k)) {
			if (typeof v !== "number") return k
		}
		if (stringList.includes(k)) {
			if (typeof v !== "string") return k
		}
		if (objectList.includes(k)) {
			if (typeof v !== "object") return k
		}
		if (booleanList.includes(k)) {
			if (typeof v !== "boolean") return k
		}
	}
	return true
}

async function findAllData(
	whereS?: {} | undefined,
	selectS?: Array<string> | undefined
): Promise<CourseResponse> {
	const whereState = whereS ?? {}
	const selectState = checkValidParam(selectS) ?? defaultSearch
	let status: number = 200
	let error: string = ""
	let data: Array<any> = []
	await SQL.findAll({
		attributes: selectState,
		where: whereState,
	})
		.then((result) => {
			status = result.length > 0 ? 200 : 204
			data = result
			error = result.length === 0 ? "Cannot find any data" : ""
		})
		.catch((err) => {
			status = 500
			error = "Unexpected Data fetching Error"
			console.log(err)
		})
	return status === 200 ? { status, data } : { status, error, data }
}

async function findAllDatafromJoin(
	whereParentS?: {} | undefined,
	whereChildS?: {} | undefined,
	selectS?: Array<string> | undefined
) {
	const whereParentState = whereParentS ?? {}
	const whereChildState = whereChildS ?? {}
	const selectState = checkValidParam(selectS) ?? defaultSearch
	let status: number = 200
	let error: string = ""
	let data: Array<any> = []
	const course = await model.course.findOne({
		attributes: selectState,
		where: whereParentState,
	})
	course.getCourse_details(whereChildState)
}

export {
	findAllData,
	findAllDatafromJoin,
	createWhereStatement,
	checkUnusedParam,
	checkIDType,
	checkAllTypes,
}
