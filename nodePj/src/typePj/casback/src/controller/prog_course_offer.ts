import { Request, Response } from "express"
import {
	checkDataChanges,
	checkUnusedParam,
	checkValidParam,
	util_checkAllType,
} from "../utils/validator"
import { prog_course_offer, programme, course, model } from "../models/init-models"
import {} from "../models/prog_course_offer"
import { Op, Model } from "sequelize"
import { flatten } from "lodash"

type DataResponse = {
	status: number
	data: Array<prog_course_offer>
	error?: string
}

const _model_class = prog_course_offer
type _model_type = prog_course_offer
const attributes_list = _model_class.getAttributes()
const model_name = "prog_course_offer"

const _parent_name = ["programme", "course"]
const _parent_class: { [key: string]: any } = { programme: programme, course: course }
type _parent_type = [programme, course]
const SQL = model.prog_course_offer
const defaultSearch = ["prog_course_offer_id", "programme_id", "course_id", "offered_sem", "remark"]
const defaultSearchParent: { [key: string]: Array<string> } = {
	programme: ["name"],
	course: ["code", "dept"],
}

type queryType = {
	table: typeof _parent_name[0] | typeof _parent_name[1] | typeof model_name
	col: keyof _parent_type[0] | keyof _parent_type[1] | keyof _model_type
}
const representationQuery: {
	[key: string]: queryType
} = {
	prog_course_offer_id: { table: model_name, col: "prog_course_offer_id" },
	offered_sem: { table: model_name, col: "offered_sem" },
	programme_id: { table: model_name, col: "programme_id" },
	course_id: { table: model_name, col: "course_id" },
	name: { table: _parent_name[0], col: "name" },
	pcode: { table: _parent_name[0], col: "code" },
	fund_mode: { table: _parent_name[0], col: "fund_mode" },
	ccode: { table: _parent_name[1], col: "code" },
	dept: { table: _parent_name[1], col: "dept" },
	subject_area: { table: _parent_name[1], col: "subject_area" },
}
/* type queryType = {
	table: "programme" | "course" | "prog_course_offer"
	col: keyof _parent_type[0] | keyof _parent_type[1] | keyof _model_type
}
const representationQuery: {
	[key: string]: queryType
} = {
	prog_course_offer_id: { table: "prog_course_offer", col: "prog_course_offer_id" },
	offered_sem: { table: "prog_course_offer", col: "offered_sem" },
	programme_id: { table: "prog_course_offer", col: "programme_id" },
	course_id: { table: "prog_course_offer", col: "course_id" },
	name: { table: "programme", col: "name" },
	pcode: { table: "programme", col: "code" },
	fund_mode: { table: "programme", col: "fund_mode" },
	ccode: { table: "course", col: "code" },
	dept: { table: "course", col: "dept" },
	subject_area: { table: "course", col: "subject_area" },
} */
const id = "prog_course_offer_id"

export async function getAllProgCourse(req: Request, res: Response) {
	const result = await findAllDatafromJoin(undefined, undefined, ["prog_course_offer_id"], {
		programme: ["name"],
		course: ["code"],
	})
	const status = 200
	res.status(status).json(result)
}
export async function getProgCourseById(req: Request, res: Response) {
	const selectState = req.body.select ?? defaultSearch
	const selectStateParent = req.body.selectParent ?? defaultSearchParent
	let status: number = 500
	let error: string = ""
	if (checkIDType(req.params)) {
		const { wherestateChild, wherestateParent } = createWhereStatement(req.params)
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

export async function createProgCourse(req: Request, res: Response) {
	const body = req.body

	let status: number = 500
	let error: string = ""
	let data: _model_type | void

	/* 
		check if any parameters are not used 
	*/
	const unused: Array<string> | boolean = checkUnusedParam(attributes_list, body)
	let warning: string = unused ? `[${unused.map((value) => value)}] is not used` : ""

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
}

export async function updateProgCourseById(req: Request, res: Response) {
	const body: { [key: string]: any } = req.body
	let status: number = 500
	let error: string = ""
	let data: Array<_model_type> = []
	let warning: string = ""
	const unused: Array<string> | boolean = checkUnusedParam(attributes_list, body)
	const typeCheckFlag: boolean | string = checkAllTypes(body)
	/* check if new code is unique */
	if (await checkUniqueParam(body)) {
		if (typeof typeCheckFlag !== "string") {
			const { wherestateChild, wherestateParent } = Object.keys(body).includes("is_current")
				? createWhereStatement(req.params, true)
				: createWhereStatement(req.params)
			const search = defaultSearch.concat([
				"code_remark",
				"title_remark",
				"unit_remark",
				"prerequisite_remark",
				"precursor_remark",
				"equivalent_remark",
				"equivalent_old_remark",
				"exclusive_remark",
				"exclusive_old_remark",
				"is_show_exclusive_with_title",
				"u_name",
				"r_host",
			])
			const result: Array<_model_type> = await findAllDatafromJoin(
				wherestateParent,
				wherestateChild,
				search
				//["prog_course_offer_id"]
			).then(({ data }) => data)
			if (result.length === 1) {
				if (unused) {
					warning = `[${unused.map((value) => value)}] is not used`
				}
				const target_item = result[0]
				/* check if data is changed */
				if (checkDataChanges(attributes_list, body, target_item)) {
					status = 200
					target_item.set(body)
					const value = await target_item.save()
					data.push(value)
					console.log(target_item.toJSON())
					console.log(body)
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
export async function deleteProgCourseById(req: Request, res: Response) {
	const body = req.body ?? {}
	const wipe: boolean = body.wipe
	let status: number = 200
	let error: string = ""
	let data: Array<_model_type> = []
	const { wherestateChild } = wipe
		? createWhereStatement(req.params, true)
		: createWhereStatement(req.params)
	const result: Array<_model_type> = await findAllDatafromJoin(undefined, wherestateChild).then(
		(r) => r.data
	)
	console.log(result.length)
	if (wipe) {
		if (result.length > 1) {
			status = 300
			error = "Too many entry fit the params"
		} else if (result.length === 0) {
			status = 204
		} else {
			const target = result[0]
			try {
				await target.destroy()
			} catch (err) {
				status = 500
				error = "Unexpected Data fetching Error"
				console.log(err)
			}
			data.push(target)
		}
	} else {
		status = 400
		error = "Programme data cannot be deleted"
	}
	return status === 200
		? res.status(status).json({ status, data })
		: res.status(status).json({ status, error })
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
	params.code_remark ?? Object.assign(params, { code_remark: "" })
	params.title_remark ?? Object.assign(params, { title_remark: "" })
	params.unit_remark ?? Object.assign(params, { unit_remark: "" })
	params.prerequisite_remark ?? Object.assign(params, { prerequisite_remark: "" })
	params.precursor_remark ?? Object.assign(params, { precursor_remark: "" })
	params.equivalent_remark ?? Object.assign(params, { equivalent_remark: "" })
	params.equivalent_old_remark ?? Object.assign(params, { equivalent_old_remark: "" })
	params.exclusive_remark ?? Object.assign(params, { exclusive_remark: "" })
	params.offered_sem ?? Object.assign(params, { offered_sem: "" })
	params.remark ?? Object.assign(params, { remark: "" })
	params.u_name ?? Object.assign(params, { u_name: "CASback" })
	params.r_host ?? Object.assign(params, { r_host: "CASback" })
	params.is_show_exclusive_with_title ??
		Object.assign(params, { is_show_exclusive_with_title: 0 })
	return params
}

function checkRequiredParam(params: { [key: string]: any }) {
	return params.hasOwnProperty("programme_id") && params.hasOwnProperty("course_id")
}

function createWhereStatement(
	params: { [key: string]: any },
	restore?: boolean /* ignored active if true */
) {
	const _params = params ?? {}
	let wherestateChild: { [key: string]: any } = {}
	let wherestateParent: { [key: string]: any } = {}
	_parent_name.forEach((name) => (wherestateParent[name] = {}))
	const ignoreInactive: boolean = restore ?? false
	const attributesC: Array<keyof _model_type> = [
		"prog_course_offer_id",
		"programme_id",
		"course_id",
		"offered_sem",
	]
	for (let i of attributesC) {
		if (!(_params[i] === undefined || _params[i] === "!")) {
			wherestateChild[i] = _params[i]
		}
	}
	const attributesP: {
		[key: string]: Array<string>
	} = {
		programme: ["name", "code", "fund_mode"],
		course: ["code", "dept", "subject_area"],
	}
	for (let [queryName, queryValue] of Object.entries(_params)) {
		_parent_name.forEach((parent) => {
			if (representationQuery[queryName]?.table === parent) {
				const realName = representationQuery[queryName]["col"]
				console.log(attributesP[parent].includes(realName))
				if (
					attributesP[parent].includes(realName) &&
					queryValue !== "!" &&
					queryValue !== undefined
				) {
					console.log(realName)
					wherestateParent[parent][realName] = queryValue
				}
			}
		})
	}
	if (!ignoreInactive) {
		//Object.assign(wherestateChild, { is_current: { [Op.not]: 0 } })
		//Object.assign(wherestateParent, { website: { [Op.not]: "inactive" } })
	}
	return { wherestateChild, wherestateParent }
}

function checkIDType({ prog_course_offer_id, programme_id, course_id }: { [key: string]: string }) {
	const _id = prog_course_offer_id ?? 0
	const _programme_id = programme_id ?? 0
	const _course_id = course_id ?? 0
	if (Number.isNaN(Number(_id)) && _id !== "!") {
		return false
	}
	if (Number.isNaN(Number(_programme_id)) && _programme_id !== "!") {
		return false
	}
	if (Number.isNaN(Number(_course_id)) && _course_id !== "!") {
		return false
	}
	return true
}

function checkAllTypes(params: { [key: string]: any }): boolean | string {
	const numberList: Array<string> = ["prog_course_offer_id", "programme_id", "course_id"]
	const stringList: Array<string> = [
		"code_remark",
		"title_remark",
		"unit_remark",
		"prerequisite_remark",
		"precursor_remark",
		"equivalent_remark",
		"equivalent_old_remark",
		"exclusive_remark",
		"offered_sem",
		"remark",
		"web_logon_name",
		"web_logon_host",
		"u_name",
		"r_host",
	]
	const booleanList: Array<string> = ["is_show_exclusive_with_title"]
	const objectList: Array<string> = []
	const nullList: Array<string> = ["date_created", "date_modified"]
	const allList = { numberList, stringList, booleanList, objectList, nullList }
	return util_checkAllType(allList, params)
}

async function findAllData(
	whereS?: {} | undefined,
	selectS?: Array<string> | undefined
): Promise<DataResponse> {
	const whereState = whereS ?? {}
	const selectState = checkValidParam(selectS, _model_class.getAttributes()) ?? defaultSearch
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

function convertStatement(selectStatement: {}) {
	const output: { [key: string]: Array<string> } = {}
	Object.entries(selectStatement).forEach(
		([key, value]) => (output[key] = checkValidParam(value, _parent_class[key].getAttributes()))
	)
	return output
}

function createIncludeState() {}

async function findAllDatafromJoin(
	whereParentS: { [key: string]: {} } | undefined,
	whereChildS: {} | undefined,
	selectC?: Array<string> | undefined,
	selectP?: { [key: string]: Array<string> } | undefined
): Promise<DataResponse> {
	const whereParentState = whereParentS ?? {}
	const whereChildState = whereChildS ?? {}
	const selectState = checkValidParam(selectC, attributes_list) ?? defaultSearch

	const selectStateParent: { [key: string]: Array<string> } = selectP
		? convertStatement(selectP)
		: defaultSearchParent
	let status: number = 200
	let error: string = ""
	let data: Array<any> = []
	try {
		data = await SQL.findAll({
			where: whereChildState,
			attributes: selectState,
			include: [
				{
					model: _parent_class[_parent_name[0]],
					as: _parent_name[0],
					where: whereParentState[_parent_name[0]],
					attributes: selectStateParent[_parent_name[0]],
				},
				{
					model: _parent_class[_parent_name[1]],
					as: _parent_name[1],
					where: whereParentState[_parent_name[1]],
					attributes: selectStateParent[_parent_name[1]],
				},
			],
		})
		status = data.length === 0 ? 204 : 200
		return { data, status }
	} catch (e) {
		status = 500
		error = "Unexpected Data fetching Error"
		console.log(e)
	}
	return status === 200 ? { data, status } : { status, error, data }
}

export {
	findAllData,
	createWhereStatement,
	checkIDType,
	nonNullParams,
	checkUniqueParam,
	hasUniqueParam,
	checkRequiredParam,
	findAllDatafromJoin,
	checkAllTypes,
}
