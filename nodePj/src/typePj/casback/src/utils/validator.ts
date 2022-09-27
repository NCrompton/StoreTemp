import { Model, Op } from "sequelize"

export function checkUnusedParam(list: {}, params: { [key: string]: any }): Array<string> | false {
	let unusedList: Array<string> | boolean = []
	for (const [k] of Object.entries(params)) {
		if (!Object.keys(list).includes(k)) {
			unusedList.push(k)
		}
	}
	return unusedList.length > 0 ? unusedList : false
}

export function checkDataChanges(attributes: {}, params: { [key: string]: any }, data: Model) {
	const _params = params ?? {}
	if (data !== undefined) {
		for (const [k, v] of Object.entries(_params)) {
			if (Object.keys(attributes).includes(k)) {
				if (data.get(k) !== v) {
					console.log(k)
					console.log(data.get(k))
					console.log(v)
					return true
				}
			}
		}
	}
	return false
}

export function checkValidParam(
	params:
		| {
				[key: string]: any
		  }
		| Array<string>,
	attributes: {}
): Array<string> | undefined {
	const _attributes = attributes ?? {}
	if (params === undefined) return undefined
	const paramList: Array<string> = params instanceof Array<string> ? params : Object.keys(params)
	const list = paramList
		.map((m: string) => {
			if (m in _attributes) return m
		})
		.filter((m) => m !== undefined)
	return list.length > 0 ? list : undefined
}

export function util_checkAllType(
	allList: { [key: string]: Array<string> },
	params: {}
): boolean | string {
	const { numberList, stringList, objectList, booleanList, nullList } = allList
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
		if (nullList.includes(k)) {
			if (typeof v !== undefined) return k
		}
	}
	return true
}
