import {
	findAllData,
	findAllDatafromJoin,
	createWhereStatement,
	checkIDType,
	checkUnusedParam,
	checkAllTypes,
	checkDataChanges,
	nonNullParams,
	checkUniqueParam,
	hasUniqueParam,
	checkRequiredParam,
} from "../controller/coursedetail"
import { describe, expect, test, jest } from "@jest/globals"
import { course_detail, model } from "../models/init-models"
import { Op } from "sequelize"

const normalSample = {
	course_id: 14,
	//course_detail_id: 14,
	name: "Computer Graphics",
	credit: 3,
	duration: 1,
	level: "B4",
	medium: "English",
	cw_percent: 40,
	exam_duration: 2,
	precursor: "( MA2144 OR MA2172 )",
	prerequisite: "( CS2302 OR CS2303 OR CS3334 OR CS3363 OR EE3206 )",
	equivalent: "( IT4301 )",
	exclusive: "( MA2182 OR MA2183 )",
	version: 1,
	is_current: 1,
	grade_pattern: "Standard (A+AA-...F)",
	cohort_from: 2009,
	cohort_to: 0,
}

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
const booleanList: Array<string> = ["cef_course", "block_transfer"]

const minimalSample = {
	course_id: 14,
	course_detail_id: 14,
	name: "Computer Graphics",
	cohort_from: 2009,
}

const requestSample = {
	id: "14",
	name: "Computer Graphics",
	version: "1",
	course_id: "14",
	code: "CS4182",
	dept: "CS",
	subject_area: "MM",
}
const requestSample2 = {
	course_detail_id: "14",
	name: "Computer Graphics",
	version: "1",
}
const _model = model.course_detail
type _model_type = course_detail
let modelSample = model.course_detail.findOne({
	where: { course_detail_id: 14 },
})

describe("findAllData", () => {
	test("get specific data", async () => {
		const sample = requestSample2
		const sample2 = ["name"]
		const result = await findAllData(sample, sample2)
		expect(result.data[0].toJSON()).toEqual({ name: "Computer Graphics" })
	})
	test("get non-existing data", async () => {
		const sample = { course_detail_id: 0 }
		const sample2 = ["name"]
		const result = await findAllData(sample, sample2)
		expect(result.status).toEqual(204)
	})
	test("get data without select statement", async () => {
		const sample = requestSample2
		const result = await findAllData(sample)
		expect(Object.keys(result.data[0].toJSON())).toEqual(defaultSearch)
	})
	test("show non-existing col of data", async () => {
		const sample = requestSample2
		const sample2 = ["course_ik", "names"]
		const result = await findAllData(sample, sample2)
		expect(Object.keys(result.data[0].toJSON())).toEqual(defaultSearch)
		expect(result.status).toBe(200)
	})
	test("get data without where statement", async () => {
		const result = await findAllData()
		const allDataCount = await _model.count()
		console.log(allDataCount)
		expect(result.data.length).toEqual(allDataCount)
	})
	test("find data conflicting params", async () => {
		const sample = { course_id: 12, name: "Digitmon" }
		const result = await findAllData(sample)
		expect(result.data.length).toBe(0)
		expect(result.status).toBe(204)
	})
	test("find data with unexpected error", async () => {
		const sample = { course_id: "go", name: "Digitmon" }
		const result = await findAllData(sample)
		expect(result.status).toBe(500)
	})
})

describe("createWhereStatement(Child)", () => {
	test("create where statement with all data present", () => {
		const sample = { name: "Hello", course_id: 1, id: 1 }
		const result = createWhereStatement(sample)
		expect(result.wherestateChild).toEqual({
			course_id: 1,
			course_detail_id: 1,
			name: "Hello",
			is_current: { [Op.not]: 0 },
		})
	})
	test("create where statement with all ! present", () => {
		const sample = { name: "!", course_id: "!", id: "!" }
		const result = createWhereStatement(sample)
		expect(result.wherestateChild).toEqual({ is_current: { [Op.not]: 0 } })
	})
	test("create where statement with some ! present", () => {
		const sample = { name: "!", course_id: 12, id: "!" }
		const result = createWhereStatement(sample)
		expect(result.wherestateChild).toEqual({
			course_id: 12,
			is_current: { [Op.not]: 0 },
		})
	})
	test("create where statement with no data present", () => {
		const sample = {}
		const result = createWhereStatement(sample)
		expect(result.wherestateChild).toEqual({ is_current: { [Op.not]: 0 } })
	})
	test("create where statement with some data present", () => {
		const sample = { course_id: 1 }
		const result = createWhereStatement(sample)
		expect(result.wherestateChild).toEqual({
			course_id: 1,
			is_current: { [Op.not]: 0 },
		})
	})
	test("create where statement with incorrect data present", () => {
		const sample = { course_id: 1, key: "" }
		const result = createWhereStatement(sample)
		expect(result.wherestateChild).toEqual({
			course_id: 1,
			is_current: { [Op.not]: 0 },
		})
	})
})

describe("createWhereStatement(Parent)", () => {
	test("create where statement with all data present", () => {
		const sample = { code: "CS4182", dept: "CS", subject_area: "MM" }
		const result = createWhereStatement(sample)
		expect(result.wherestateParent).toEqual({
			code: "CS4182",
			dept: "CS",
			subject_area: "MM",
		})
	})
	test("create where statement with all ! present", () => {
		const sample = { code: "!", dept: "!", subject_area: "!" }
		const result = createWhereStatement(sample)
		expect(result.wherestateParent).toEqual({})
	})
	test("create where statement with some ! present", () => {
		const sample = { code: "!", dept: "CS", subject_area: "!" }
		const result = createWhereStatement(sample)
		expect(result.wherestateParent).toEqual({
			dept: "CS",
		})
	})
	test("create where statement with no data present", () => {
		const sample = {}
		const result = createWhereStatement(sample)
		expect(result.wherestateParent).toEqual({})
	})
	test("create where statement with some data present", () => {
		const sample = { code: "AB7777" }
		const result = createWhereStatement(sample)
		expect(result.wherestateParent).toEqual({
			code: "AB7777",
		})
	})
	test("create where statement with incorrect data present", () => {
		const sample = { code: "AB7777", key: "" }
		const result = createWhereStatement(sample)
		expect(result.wherestateParent).toEqual({
			code: "AB7777",
		})
	})
})

describe("createWhereStatement", () => {
	test("all query presented", () => {
		const sample = requestSample
		const result = createWhereStatement(sample)
		expect(result).toEqual({
			wherestateChild: {
				course_detail_id: "14",
				name: "Computer Graphics",
				version: "1",
				course_id: "14",
				is_current: { [Op.not]: 0 },
			},
			wherestateParent: {
				code: "CS4182",
				dept: "CS",
				subject_area: "MM",
			},
		})
	})
})

describe("checkIDType", () => {
	test("requestSample test", () => {
		const sample = requestSample
		const result = checkIDType(sample)
		expect(result).toBe(true)
	})
	test("all id present with incorrect type", () => {
		const sample = { course_id: "f", id: "s" }
		const result = checkIDType(sample)
		expect(result).toBe(false)
	})
	test("all id present with some incorrect type (ID)", () => {
		const sample = { course_id: "5", id: "s" }
		const result = checkIDType(sample)
		expect(result).toBe(false)
	})
	test("incorrect version type", () => {
		const sample = { version: "s" }
		const result = checkIDType(sample)
		expect(result).toBe(false)
	})
	test("incorrect course_id type", () => {
		const sample = { course_id: "s" }
		const result = checkIDType(sample)
		expect(result).toBe(false)
	})
	test("no id presented", () => {
		const sample = {}
		const result = checkIDType(sample)
		expect(result).toBe(true)
	})
	test("incorrect key presented", () => {
		const sample = { IK: "g", PL: "a" }
		const result = checkIDType(sample)
		expect(result).toBe(true)
	})
	test("some incorrect key presented", () => {
		const sample = { course_id: "5", IK: "g", PL: "a" }
		const result = checkIDType(sample)
		expect(result).toBe(true)
	})
})

describe("checkUnusedParam", () => {
	test("checkUnusedParam where all used", async () => {
		const sample = normalSample
		const result = checkUnusedParam(sample)
		expect(result).toBe(false)
	})
	test("checkUnusedParam where none is used", async () => {
		const sample = { garbagex: 25, trashx: "boo" }
		const result = checkUnusedParam(sample)
		expect(result).toEqual([{ value: "garbagex" }, { value: "trashx" }])
	})
	test("checkUnusedParam where partially used", async () => {
		const sample = { garbagex: 25, name: "CS2468" }
		const result = checkUnusedParam(sample)
		expect(result).toEqual([{ value: "garbagex" }])
	})
	test("checkUnusedParam where partially used (all)", async () => {
		const sample = {
			course_id: 25,
			course_detail_id: 12,
			name: "",
			garbagex: "",
			trashx: "",
		}
		const result = checkUnusedParam(sample)
		expect(result).toEqual([{ value: "garbagex" }, { value: "trashx" }])
	})
})

describe("checkAllTypes", () => {
	test("input all correct types", async () => {
		const sample = normalSample
		const result = checkAllTypes(sample)
		expect(result).toEqual(true)
	})
	test("input all incorrect types", async () => {
		const sample = {
			name: ["CS2468"],
			level: [""],
			duration: "12",
			cw_percent: {},
		}
		const result = checkAllTypes(sample)
		expect(result).toEqual("name")
	})
	test("input all nothing", async () => {
		const sample = {}
		const result = checkAllTypes(sample)
		expect(result).toEqual(true)
	})
	test("input non-existing boolean object", async () => {
		const sample = { xbolx: true }
		const result = checkAllTypes(sample)
		expect(result).toEqual(true)
	})
	test("input each number type correct and incorrect loop", async () => {
		const result = numberList.map((sample) => {
			let data: { [key: string]: any } = {}
			data[sample] = 1
			expect(checkAllTypes(data)).toBe(true)
			data[sample] = {}
			expect(checkAllTypes(data)).toBe(sample)
		})
	})
	test("input each number type correct and incorrect loop", async () => {
		const result = stringList.map((sample) => {
			let data: { [key: string]: any } = {}
			data[sample] = ""
			expect(checkAllTypes(data)).toBe(true)
			data[sample] = false
			expect(checkAllTypes(data)).toBe(sample)
		})
	})
	test("input each boolean type correct and incorrect loop", async () => {
		const result = booleanList.map((sample) => {
			let data: { [key: string]: any } = {}
			data[sample] = true
			expect(checkAllTypes(data)).toBe(true)
			data[sample] = ""
			expect(checkAllTypes(data)).toBe(sample)
		})
	})
})

describe("checkDataChanges", () => {
	test("normal data (2 columns changes)", async () => {
		const sample = normalSample
		const data = await modelSample
		const result = checkDataChanges(sample, data)
		expect(result).toEqual(true)
	})
	test("same data with 3 body params", async () => {
		const sample = minimalSample
		const data = await modelSample
		const result = checkDataChanges(sample, data)
		expect(result).toEqual(false)
	})
	test("1 different data", async () => {
		const sample = { course_id: 15, name: "Computer Graphics", credit: 3 }
		const data = await modelSample
		const result = checkDataChanges(sample, data)
		expect(result).toEqual(true)
	})
	test("no body params", async () => {
		const sample = {}
		const data = await modelSample
		const result = checkDataChanges(sample, data)
		expect(result).toBe(false)
	})
	test("no data", async () => {
		const sample = minimalSample
		const data: _model_type = undefined
		const result = checkDataChanges(sample, data)
		expect(result).toBe(false)
	})
})

describe("findAllDatafromJoin", () => {
	test("find specific data with parent and child where state present ", async () => {
		const sample = { course_id: 14 }
		const sample2 = { course_detail_id: 14 }
		const result = await findAllDatafromJoin(sample, sample2)
		expect(result.data[0].course_details[0].course_detail_id).toEqual(14)
	})
	test("find specific data with only parent where state present", async () => {
		const sample = { course_id: 14 }
		const sample2 = {}
		const result = await findAllDatafromJoin(sample, sample2)
		expect(result.data[0].course_details[0].course_detail_id).toEqual(14)
		expect(result.data[0].course_details[1].course_detail_id).toEqual(508)
	})
	test("find specific data with only child where state present", async () => {
		const sample = {}
		const sample2 = { course_detail_id: 14 }
		const result = await findAllDatafromJoin(sample, sample2)
		expect(result.data[0].course_details[0].course_detail_id).toEqual(14)
	})
})

describe("nonNullParams", () => {
	test("all param presented", () => {
		const sample = normalSample
		const result = nonNullParams(sample)
		expect(result).toEqual(
			Object.assign(sample, {
				fund_mode: "",
				cef_course: 0,
				block_transfer: 0,
				remark: "",
				u_name: "CASback",
				r_host: "CASback",
			})
		)
	})
	test("no param presented", () => {
		const sample = {}
		const result = nonNullParams(sample)
		expect(result).toEqual({
			credit: 3,
			duration: 1,
			medium: "English",
			cw_percent: 100,
			exam_percent: 0,
			exam_duration: 2,
			precursor: "",
			prerequisite: "",
			equivalent: "",
			exclusive: "",
			fund_mode: "",
			cef_course: 0,
			block_transfer: 0,
			remark: "",
			version: 1,
			is_current: 1,
			grade_pattern: "Standard (A+AA-...F)",
			cohort_to: 0,
			u_name: "CASback",
			r_host: "CASback",
		})
	})
	test("some param presented", () => {
		const sample = {
			credit: 5,
			duration: 2,
			medium: "French",
			cw_percent: 80,
			exam_percent: 20,
			exam_duration: 5,
			is_current: 0,
			prerequisite: "None",
		}
		const result = nonNullParams(sample)
		expect(result).toEqual({
			credit: 5,
			duration: 2,
			medium: "French",
			cw_percent: 80,
			exam_percent: 20,
			exam_duration: 5,
			precursor: "",
			prerequisite: "None",
			equivalent: "",
			exclusive: "",
			fund_mode: "",
			cef_course: 0,
			block_transfer: 0,
			remark: "",
			version: 1,
			is_current: 0,
			grade_pattern: "Standard (A+AA-...F)",
			cohort_to: 0,
			u_name: "CASback",
			r_host: "CASback",
		})
	})
})

describe("checkUniqueParam", () => {
	test("normal Sample", async () => {
		const sample = normalSample
		const result = await checkUniqueParam(sample)
		expect(result).toBe(true)
	})
})
describe("hasUniqueParam", () => {
	test("normal Sample", () => {
		const sample = normalSample
		const result = hasUniqueParam(sample)
		expect(result).toBe(false)
	})
})
describe("checkRequiredParam", () => {
	test("normal Sample", () => {
		const sample = normalSample
		const result = checkRequiredParam(sample)
		expect(result).toBe(true)
	})
	test("insufficient required parameters", () => {
		const sample = { course_id: 14, name: "" }
		const result = checkRequiredParam(sample)
		expect(result).toBe(false)
	})
	test("no body parameters is passed", () => {
		const sample = {}
		const result = checkRequiredParam(sample)
		expect(result).toBe(false)
	})
	test("just the required parameter is passed", () => {
		const sample = { course_id: 14, name: "", level: "", cohort_from: 0 }
		const result = checkRequiredParam(sample)
		expect(result).toBe(true)
	})
})
