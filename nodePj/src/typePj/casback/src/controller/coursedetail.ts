import { Request, Response } from "express"
import { model, course_detail, course } from "../models/init-models"
import { Op } from "sequelize"
import { flatten } from "lodash"

type DataResponse = {
	status: number
	data: Array<course>
	error?: string
}
const _model_class = course_detail
type _model_type = course_detail
const _parent_class = course
type _parent_type = course
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
const defaultSearchParent = [
	"course_id",
	"code",
	"dept",
	"website",
	"subject_area",
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

export async function getCourseDetailById(req: Request, res: Response) {
	const selectState = req.body.select ?? defaultSearch
	const selectStateParent = req.body.selectParent ?? defaultSearchParent
	let status: number = 500
	let error: string = ""
	if (checkIDType(req.params)) {
		const { wherestateChild, wherestateParent } = createWhereStatement(
			req.params
		)
		const result = await findAllDatafromJoin(
			wherestateParent,
			wherestateChild,
			selectState,
			selectStateParent
		)
		return res.status(result.status).json(result)
	} else {
		status = 400
		error = "Invalid parameters"
	}
	return res.status(status).json({ status, error })
}

export async function createCourseDetail(req: Request, res: Response) {
	const body = req.body

	let status: number = 500
	let error: string = ""
	let data: _model_type | void

	/* 
		check if any parameters are not used 
	*/
	const unused: Array<{ [key: string]: string }> | boolean =
		checkUnusedParam(body)
	let warning: string = unused
		? `[${unused.map(({ value }) => value)}] is not used`
		: ""

	/* check if parameter sufficient to create a new course */
	const typeCheckFlag: boolean | string = checkAllTypes(body)
	if (checkRequiredParam(body)) {
		/* check the parameters type is correct */
		if (typeof typeCheckFlag !== "string") {
			/* check if unique parameter is unique */
			if (await checkUniqueParam(body)) {
				const newData = nonNullParams(body) 
				status = 201
				data = await SQL.create(newData).catch((err) => {
					status = 500
					error = "Unexpected Data fetching Error"
					console.log(err)
				})
			} else {
				status = 409
				error = `Data with Code ${body.name} already existed`
			}
		} else {
			status = 400
			error = `Invalid data type for key [${typeCheckFlag}]`
		}
	} else {
		status = 400
		error = "Parameter is insufficient to create a new data"
	}
	return status === 201
		? unused
			? res.status(status).json({ status, data, warning })
			: res.status(status).json({ status, data })
		: res.status(status).json({ status, error })
	//return res.status(status).json({ status, data, warning, error })
}

export async function updateCourseDetailById(req: Request, res: Response) {
	const body: { [key: string]: any } = req.body
	let status: number = 500
	let error: string = ""
	let data: Array<_model_type> = []
	let warning: string = ""
	const unused: Array<{ [key: string]: string }> | boolean =
		checkUnusedParam(body)
	const typeCheckFlag: boolean | string = checkAllTypes(body)
	/* check if new code is unique */
	if (await checkUniqueParam(body)) {
		if (typeof typeCheckFlag !== "string") {
			const { wherestateChild, wherestateParent } = Object.keys(body).includes(
				"is_current"
			)
				? createWhereStatement(req.params, true)
				: createWhereStatement(req.params)
			const result: Array<_model_type> = await findAllDatafromJoin(
				wherestateParent,
				wherestateChild
			).then((d) => flatten(d.data.map((c) => c.course_details)))
			//fix findAllDatafromJoin
			if (result.length === 1) {
				if (unused) {
					warning = `[${unused.map(({ value }) => value)}] is not used`
				}
				const target_item = result[0]
				/* check if data is changed */
				if (checkDataChanges(body, target_item)) {
					status = 200
					target_item.set(body)
					const value = await target_item.save()
					data.push(value)
				} else {
					status = 208
					warning = "There are no different between new and old data"
				}
			} else {
				if (result.length > 1) {
					if (!hasUniqueParam(body)) {
						status = 200
						result.forEach((target_item, index) => {
							target_item.set(body)
							data.push(target_item)
							target_item.save()
						})
					} else {
						status = 300
						error = "Cannot bulk update unique value"
					}
				} else {
					status = 204
					error = "No data found"
				}
				console.log(data.length)
			}
		} else {
			/* return error if data type not match with course interface */
			status = 400
			error = `Invalid data type for Course [${typeCheckFlag}]`
		}
	} else {
		status = 409
		error = `Course with name ${body.code} already existed`
	}

	return status === 200
		? unused
			? res.status(status).json({ status, data, warning })
			: res.status(status).json({ status, data })
		: status === 208
		? res.status(status).json({ status, warning })
		: res.status(status).json({ status, error })
}

export async function deleteCourseDetailById(req: Request, res: Response) {
	const body = req.body ?? {}
	const wipe: boolean = body.wipe
	let status: number = 200
	let error: string = ""
	let data: Array<_model_type> = []
	const { wherestateChild, wherestateParent } = wipe
		? createWhereStatement(req.params, true)
		: createWhereStatement(req.params)
	const result: Array<_model_type> = await findAllDatafromJoin(
		wherestateParent,
		wherestateChild
	).then((d) => flatten(d.data.map((c) => c.course_details)))
	console.log(result.length)
	if (result.length > 1) {
		if (wipe) {
			status = 300
			error = "Too many entry fit the params"
		} else {
			status = 200
			result.forEach((target_item) => {
				target_item.set({ is_current: 0 })
				data.push(target_item)
				target_item.save()
			})
		}
	} else if (result.length === 0) {
		status = 204
	} else {
		const target = result[0]
		try {
			wipe ? await target.destroy() : await target.update({ is_current: 0 })
		} catch (err) {
			status = 500
			error = "Unexpected Data fetching Error"
			console.log(err)
		}
		data.push(target)
	}
	return status === 200
		? res.status(status).json({ status, data })
		: res.status(status).json({ status, error })
}

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
	params.exam_duration ?? Object.assign(params, { exam_duration: 2 })
	params.precursor ?? Object.assign(params, { precursor: "" })
	params.prerequisite ?? Object.assign(params, { prerequisite: "" })
	params.equivalent ?? Object.assign(params, { equivalent: "" })
	params.exclusive ?? Object.assign(params, { exclusive: "" })
	params.fund_mode ?? Object.assign(params, { fund_mode: "" })
	params.cef_course ?? Object.assign(params, { cef_course: false })
	params.block_transfer ?? Object.assign(params, { block_transfer: false })
	params.remark ?? Object.assign(params, { remark: "" })
	params.version ?? Object.assign(params, { version: 1 })
	params.is_current ?? Object.assign(params, { is_current: 1 })
	params.grade_pattern ??
		Object.assign(params, { grade_pattern: "Standard (A+AA-...F)" })
	params.chort_to ?? Object.assign(params, { cohort_to: 0 })
	params.u_name ?? Object.assign(params, { u_name: "CASback" })
	params.r_host ?? Object.assign(params, { r_host: "CASback" })
	//params.timestamp ?? Object.assign(params, { timestamp: DataTypes.NOW })
	return params
}

function checkDataChanges(params: { [key: string]: any }, data: _model_type) {
	const attributes: object = _model_class.getAttributes()
	const _params = params ?? {}
	if (data !== undefined) {
		for (const [k, v] of Object.entries(_params)) {
			if (Object.keys(attributes).includes(k)) {
				if (data.get(k) !== v) {
					return true
				}
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
		| Array<string>,
	isParent: boolean
): Array<string> | undefined {
	if (params === undefined) return undefined
	const attributes = isParent
		? _parent_class.getAttributes()
		: _model_class.getAttributes()
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
	const _params = params ?? {}
	let wherestateChild: { [key: string]: any } = {}
	let wherestateParent: { [key: string]: any } = {}
	const ignoreInactive: boolean = restore ?? false
	const attributesC: Array<keyof _model_type> = [
		"name",
		"course_detail_id",
		"course_id",
		"version",
	]
	if (!(_params["id"] === undefined || _params["id"] === "!")) {
		wherestateChild[id] = _params["id"]
	}
	for (let i of attributesC) {
		if (!(_params[i] === undefined || _params[i] === "!")) {
			wherestateChild[i] = _params[i]
		}
	}
	const attributesP: Array<keyof _parent_type> = [
		"code",
		"dept",
		"subject_area",
	]
	for (let i of attributesP) {
		if (!(_params[i] === undefined || _params[i] === "!"))
			wherestateParent[i] = _params[i]
	}
	if (!ignoreInactive) {
		Object.assign(wherestateChild, { is_current: { [Op.not]: 0 } })
		//Object.assign(wherestateParent, { website: { [Op.not]: "inactive" } })
	}
	return { wherestateChild, wherestateParent }
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

function checkAllTypes(params: { [key: string]: any }): boolean | string {
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
		"fund_mode",
		"remark",
		"grade_pattern",
		"u_name",
		"r_host",
	]
	const booleanList: Array<string> = ["cef_course", "block_transfer"]
	const objectList: Array<string> = []
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
): Promise<DataResponse> {
	const whereState = whereS ?? {}
	const selectState = checkValidParam(selectS, false) ?? defaultSearch
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
	whereParentS: {} | undefined,
	whereChildS: {} | undefined,
	selectC?: Array<string> | undefined,
	selectP?: Array<string> | undefined
): Promise<DataResponse> {
	const whereParentState = whereParentS ?? {}
	const whereChildState = whereChildS ?? {}
	const selectState = checkValidParam(selectC, false) ?? defaultSearch
	const selectStateParent =
		checkValidParam(selectP, true) ?? defaultSearchParent
	let status: number = 200
	let error: string = ""
	let data: Array<any> = []
	try {
		const courses = await model.course.findAll({
			where: whereParentState,
			attributes: selectStateParent,
			include: {
				model: course_detail,
				as: "course_details",
				where: whereChildState,
				attributes: selectState,
			},
		})
		courses.length === 0 ? (status = 204) : (data = courses)
	} catch (e) {
		status = 500
		error = "Unexpected Data fetching Error"
		console.log(e)
	}
	return status === 200 ? { data, status } : { status, error, data }
}

export {
	findAllData,
	findAllDatafromJoin,
	createWhereStatement,
	checkUnusedParam,
	checkIDType,
	checkAllTypes,
	checkDataChanges,
	nonNullParams,
	checkUniqueParam,
	hasUniqueParam,
	checkRequiredParam,
}
