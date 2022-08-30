import { Request, Response } from "express"
import { model, course } from "../models/init-models"
import { Op } from "sequelize"
import type { courseAttributes } from "../models/init-models"
import type { courseOptionalAttributes } from "../models/course"
import internal from "node:stream"

type CourseResponse = {
	status: string
	data: Array<course>
	error?: string
}

export async function getCourse(req: Request, res: Response) {
	const result = await findAllCourse(undefined, ["code"])
	return res.json(result)
}

export async function getCourseById(req: Request, res: Response) {
	const course_id = req.params.id === "?" || ""
	let status: string = "400"
	let error: string = "Invalid parameters"
	if (checkIDType(req.params)) {
		const whereState = createWhereStatement(req.params)
		const result = await findAllCourse(whereState, [
			"course_id",
			"code",
			"dept",
			"website",
		])
		return res.json(result)
	}
	return res.json({ status, error })
}

export async function createCourse(req: Request, res: Response) {
	const param = req.body

	let status: string = "409"
	let error: string = `Course with Code ${req.body.code} already existed`
	let data: course | void = new course()
	let warning: string = ""
	/* check if any parameters are not used */
	const unused: Array<{ [key: string]: string }> | boolean =
		checkUnusedParam(param)
	if (param.code === undefined || param.dept === undefined) {
		/* check if parameter sufficient to create a new course */
		status = "400"
		error = "Parameter is insufficient to create a new course"
	} else {
		if (unused) {
			warning = `[${unused.map(({ value }) => value)}] is not used`
		}
		const info = await findAllCourse({ code: req.body.code }, ["code"])
		if (info.data.length === 0) {
			status = "201"
			data = await model.course.create(param).catch((err) => {
				status = "500"
				error = "Unexpected Data fetching Error"
				console.log(err)
			})
		}
	}
	return status === "201"
		? unused
			? res.json({ status, data, warning })
			: res.json({ status, data })
		: res.json({ status, error })
}

export async function updateCourse(req: Request, res: Response) {
	const body: { [key: string]: any } = req.body
	let status: string = "304"
	let error: string = ""
	let data: course = new course()
	let warning: string = "There are no different between new and old data"
	const unused: Array<{ [key: string]: string }> | boolean =
		checkUnusedParam(body)
	if (checkAllTypes(body)) {
		const whereState: {} = Object.keys(body).includes("website")
			? createWhereStatement(req.params, true)
			: createWhereStatement(req.params)
		const result = await findAllCourse(whereState).then((d) => d.data)
		const attributes: object = course.getAttributes()
		if (result.length !== 1) {
			if (result.length > 1) {
				status = "300"
				error = "Too many entry fit the params"
			} else {
				status = "204"
				error = "No data found"
			}
		} else {
			if (unused) {
				warning = `[${unused.map(({ value }) => value)}] is not used`
			}
			data = result[0]
			const deployUpdate = () => {
				status = "200"
				data.set(body)
				data.save()
			}
			console.log(data)
			for (const [k, v] of Object.entries(body)) {
				if (Object.keys(attributes).includes(k)) {
					if (data.get(k) !== v) {
						deployUpdate()
					}
				}
			}
		}
	} else {
		/* return error if data type not match with course interface */
		status = "400"
		error = "Invalid data type for Course"
	}
	return status === "200"
		? unused
			? res.json({ status, data, warning })
			: res.json({ status, data })
		: status === "304"
		? res.json({ status, warning })
		: res.json({ status, error })
}

export async function deleteCourse(req: Request, res: Response) {
	const whereState = createWhereStatement(req.params)
	let status: string = "200"
	let error: string = ""
	let result = await findAllCourse(whereState)
	if (result.data.length > 1) {
		status = "300"
		error = "Too many entry fit the params"
	} else if (result.status === "204") {
		return res.json(result)
	}

	const target = result.data[0]

	await target.update({ website: "inactive" })
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

function checkValidParam(params: { [key: string]: any }) {
	const attributes = course.getAttributes()
	let paramList: Array<string> = Object.keys(params)
	let o: Array<string> = Object.keys(params)
	console.log(paramList.map((m: string) => m in attributes ?? m))
}

export function sum(a: number, b: number): number {
	return a + b
}

function createWhereStatement(
	params: { [key: string]: any },
	restore?: boolean
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

function checkAllTypes(params: { [key: string]: any }): boolean {
	for (const [k, v] of Object.entries(params)) {
		switch (k) {
			case "code": {
				if (typeof v !== "string") return false
			}
			case "dept": {
				if (typeof v !== "string") return false
			}
			case "subject_area": {
				if (typeof v !== "string") return false
			}
			case "website": {
				if (typeof v !== "string") return false
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
	const selectState = selectS ?? [
		"course_id",
		"code",
		"dept",
		"website",
		"subject_area",
	]
	let status: string = "200"
	let error: string = ""
	let data: Array<any> = []
	await model.course
		.findAll({
			attributes: selectState,
			where: whereState,
		})
		.then((result) => {
			status = result.length > 0 ? "200" : "204"
			data = result
			error = result.length === 0 ? "Cannot find any data" : ""
			/* status = "200"
            data = result*/
		})
		.catch((err) => {
			status = "500"
			error = "Unexpected Data fetching Error"
			console.log(err)
		})
	return status === "200" ? { status, data } : { status, error, data }
}
