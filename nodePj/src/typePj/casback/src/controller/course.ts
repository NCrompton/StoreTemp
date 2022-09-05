import { Request, Response } from "express"
import { model, course } from "../models/init-models"
import { Op } from "sequelize"
import type { courseAttributes } from "../models/init-models"
import type { courseOptionalAttributes } from "../models/course"
import internal from "node:stream"
import { parseArgs } from "node:util"

type CourseResponse = {
	status: number
	data: Array<course>
	error?: string
}
const SQL = model.course

export async function getCourse(req: Request, res: Response) {
	const result = await findAllCourse(undefined, ["code"])
	return res.json(result)
}

export async function getCourseById(req: Request, res: Response) {
	const selectState = req.body.select ?? [
		"course_id",
		"code",
		"dept",
		"website",
		"subject_area",
	]
	let status: number = 500
	let error: string = ""
	if (checkIDType(req.params)) {
		const whereState = createWhereStatement(req.params)
		const result = await findAllCourse(whereState, selectState)
		return res.status(result.status).json(result)
	} else {
		status = 400
		error = "Invalid parameters"
	}
	return res.status(status).json({ status, error })
}

export async function createCourse(req: Request, res: Response) {
	const body = req.body

	let status: number = 500
	let error: string = ""
	let data: course | void = new course()

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
				body.website ?? Object.assign(body, { website: "" })
				body.subject_area ?? Object.assign(body, { subject_area: "" })
				status = 201
				data = await SQL.create(body).catch((err) => {
					status = 500
					error = "Unexpected Data fetching Error"
					console.log(err)
				})
			} else {
				status = 409
				error = `Data with Code ${req.body.code} already existed`
			}
		} else {
			status = 400
			error = `Invalid data type for key [${typeCheckFlag}]`
		}
	} else {
		status = 400
		error = "Parameter is insufficient to create a new data"
	}
	/* return status === 201
		? unused
			? res.status(status).json({ status, data, warning })
			: res.status(status).json({ status, data })
		: res.status(status).json({ status, error }) */
	return res.status(status).json({ status, data, warning, error })
}

export async function updateCourse(req: Request, res: Response) {
	const body: { [key: string]: any } = req.body
	let status: number = 500
	let error: string = ""
	let data: course = new course()
	let warning: string = ""
	const unused: Array<{ [key: string]: string }> | boolean =
		checkUnusedParam(body)
	const typeCheckFlag: boolean | string = checkAllTypes(body)
	/* check if new code is unique */
	if (await checkUniqueParam(body)) {
		if (typeof typeCheckFlag !== "string") {
			const whereState: {} = Object.keys(body).includes("website")
				? createWhereStatement(req.params, true)
				: createWhereStatement(req.params)
			const result = await findAllCourse(whereState).then((d) => d.data)
			if (result.length === 1) {
				if (unused) {
					warning = `[${unused.map(({ value }) => value)}] is not used`
				}
				data = result[0]
				/* check if data is changed */
				if (checkDataChanges(body, data)) {
					status = 200
					data.set(body)
					data.save()
				} else {
					status = 208
					warning = "There are no different between new and old data"
				}
			} else {
				if (result.length > 1) {
					status = 300
					error = "Too many entry fit the params"
				} else {
					status = 204
					error = "No data found"
				}
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

export async function deleteCourse(req: Request, res: Response) {
	const wipe: boolean = req.body.wipe
	let status: string = "200"
	let error: string = ""
	const whereState = wipe
		? createWhereStatement(req.params, true)
		: createWhereStatement(req.params)
	let result = await findAllCourse(whereState)
	if (result.data.length > 1) {
		status = "300"
		error = "Too many entry fit the params"
	} else if (result.status === 204) {
		return res.json(result)
	}

	const target = result.data[0]
	wipe ? await target.destroy() : await target.update({ website: "inactive" })
	return res.json({ status: "200", data: target })
}

function checkUnusedParam(params: { [key: string]: any }) {
	const list = course.getAttributes()
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
	if (params.hasOwnProperty("code")) {
		result =
			(await model.course.count({ where: { code: params.code } })) === 0 &&
			result
	}
	if (params.hasOwnProperty("course_id")) {
		result =
			(await model.course.count({ where: { course_id: params.course_id } })) ===
				0 && result
	}
	return result
}

function checkDataChanges(params: { [key: string]: any }, data: course) {
	const attributes: object = course.getAttributes()
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
	return params.hasOwnProperty("code") && params.hasOwnProperty("dept")
}

function checkValidParam(
	params:
		| {
				[key: string]: any
		  }
		| Array<string>
): Array<string> | undefined {
	if (params === undefined) return undefined
	const attributes = course.getAttributes()
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
	const wherestate = {}
	const ignoreInactive: boolean = restore ?? false
	params.id === "!" || Object.assign(wherestate, { course_id: params.id })
	params.code === "!" ||
		params.code === undefined ||
		Object.assign(wherestate, { code: params.code })
	params.dept === "!" ||
		params.dept === undefined ||
		Object.assign(wherestate, { dept: params.dept })
	params.subject_area === "!" ||
		params.subject_area === undefined ||
		Object.assign(wherestate, { dept: params.subject_area })
	/* unselect inactive entries */
	ignoreInactive ||
		Object.assign(wherestate, { website: { [Op.not]: "inactive" } })

	return wherestate
}

function checkIDType({ id }: { [key: string]: string }) {
	if (!Number.isNaN(Number(id)) || id === "!") {
		return true
	}
	return false
}

function checkAllTypes(params: { [key: string]: any }): boolean | string {
	for (const [k, v] of Object.entries(params)) {
		switch (k) {
			case "code": {
				if (typeof v !== "string") return k
			}
			case "dept": {
				if (typeof v !== "string") return k
			}
			case "subject_area": {
				if (typeof v !== "string") return k
			}
			case "website": {
				if (typeof v !== "string") return k
			}
		}
	}
	return true
}

async function findAllCourse(
	whereS?: {} | undefined,
	selectS?: Array<string> | undefined
): Promise<CourseResponse> {
	const whereState = whereS ?? {}
	const selectState = checkValidParam(selectS) ?? [
		"course_id",
		"code",
		"dept",
		"website",
		"subject_area",
	]
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
			/* status = "200"
            data = result*/
		})
		.catch((err) => {
			status = 500
			error = "Unexpected Data fetching Error"
			console.log(err)
		})
	return status === 200 ? { status, data } : { status, error, data }
}

export {
	findAllCourse,
	checkAllTypes,
	checkUnusedParam,
	checkIDType,
	createWhereStatement,
	checkValidParam,
	checkDataChanges,
	checkUniqueParam,
}
