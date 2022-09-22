import { Request, Response } from "express"
import { programme, model } from "../models/init-models"
import {
	checkUnusedParam,
	checkDataChanges,
	checkValidParam,
	util_checkAllType,
} from "../utils/validator"

type DataResponse = {
	status: number
	data: Array<programme>
	error?: string
}
const _model_class = programme
type _model_type = programme
const SQL = model.programme
const attributes_list = programme.getAttributes()
const defaultSearch = [
	"programme_id",
	"name",
	"award_title",
	"code",
	"alias",
	"dept",
	"mode",
	"fund_mode",
	"cohort",
	"intake",
]

const id = "programme_id"

export async function getAllProgram(req: Request, res: Response) {
	const result = await findAllData(undefined, ["name", "code"])
	const status = result.status
	res.status(status).json(result)
}

export async function getProgramById(req: Request, res: Response) {
	const selectState = req.body.select ?? defaultSearch
	let status: number = 500
	let error: string = ""
	if (checkIDType(req.params)) {
		const { wherestateChild } = createWhereStatement(req.params)
		const result = await findAllData(wherestateChild, selectState)
		return res.status(result.status).json(result)
	} else {
		status = 400
		error = "Invalid parameters"
	}
	return res.status(status).json({ status, error })
}

export async function createProgram(req: Request, res: Response) {
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

export async function updateProgramById(req: Request, res: Response) {
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
			const { wherestateChild } = Object.keys(body).includes("is_current")
				? createWhereStatement(req.params, true)
				: createWhereStatement(req.params)
			const result: Array<_model_type> = await findAllData(wherestateChild).then(
				(r) => r.data
			)
			//fix findAllDatafromJoin
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

export async function deleteProgramById(req: Request, res: Response) {
	const body = req.body ?? {}
	const wipe: boolean = body.wipe
	let status: number = 200
	let error: string = ""
	let data: Array<_model_type> = []
	const { wherestateChild } = wipe
		? createWhereStatement(req.params, true)
		: createWhereStatement(req.params)
	const result: Array<_model_type> = await findAllData(wherestateChild).then((r) => r.data)
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
	params.dept ?? Object.assign(params, { dept: "CS" })
	params.fund_mode ?? Object.assign(params, { fund_mode: "" })
	params.intake ?? Object.assign(params, { intake: 0 })
	params.u_name ?? Object.assign(params, { u_name: "CASback" })
	params.r_host ?? Object.assign(params, { r_host: "CASback" })
	return params
}

function checkRequiredParam(params: { [key: string]: any }) {
	return (
		params.hasOwnProperty("name") &&
		params.hasOwnProperty("award_title") &&
		params.hasOwnProperty("code") &&
		params.hasOwnProperty("alias") &&
		params.hasOwnProperty("mode") &&
		params.hasOwnProperty("cohort")
	)
}

function createWhereStatement(
	params: { [key: string]: any },
	restore?: boolean /* ignored active if true */
) {
	const _params = params ?? {}
	let wherestateChild: { [key: string]: any } = {}
	const ignoreInactive: boolean = restore ?? false
	/* CHILD TYPE WHERE STATEMENT GENERATOR */
	const attributesC: Array<keyof _model_type> = [
		"programme_id",
		"name",
		"code",
		"dept",
		"mode",
		"cohort",
	]
	for (let i of attributesC) {
		if (!(_params[i] === undefined || _params[i] === "!")) {
			wherestateChild[i] = _params[i]
		}
	}
	if (!ignoreInactive) {
		//Object.assign(wherestateChild, { is_current: { [Op.not]: 0 } })
	}
	return { wherestateChild }
}

function checkIDType({ programme_id, cohort }: { [key: string]: string }) {
	const _id = programme_id ?? 0
	const _cohort = cohort ?? 0
	if (Number.isNaN(Number(_id)) && _id !== "!") {
		return false
	}
	if (Number.isNaN(Number(_cohort)) && _cohort !== "!") {
		return false
	}
	return true
}

function checkAllTypes(params: { [key: string]: any }): boolean | string {
	const numberList: Array<string> = ["programme_id", "cohort", "intake"]
	const stringList: Array<string> = [
		"name",
		"award_title",
		"code",
		"alias",
		"dept",
		"mode",
		"fund_mode",
		"web_logon_name",
		"web_logon_host",
		"u_name",
		"r_host",
	]
	const booleanList: Array<string> = []
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

export {
	findAllData,
	createWhereStatement,
	checkIDType,
	nonNullParams,
	checkUniqueParam,
	hasUniqueParam,
	checkRequiredParam,
}
