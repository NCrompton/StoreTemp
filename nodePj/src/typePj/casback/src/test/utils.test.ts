import { createUrlList } from "../utils/utils"
import {
	checkValidParam,
	checkDataChanges,
	checkUnusedParam,
	util_checkAllType,
} from "../utils/validator"
import { describe, expect, test, jest } from "@jest/globals"
import { course_detail, programme, model } from "../models/init-models"

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

const minimalSample = {
	course_id: 14,
	course_detail_id: 14,
	name: "Computer Graphics",
	cohort_from: 2009,
}

let modelSample = model.course_detail.findOne({
	where: { course_detail_id: 14 },
})
let modelSample_pg = model.programme.findOne({
	where: { programme_id: 1 },
})

const cd_attributes = model.course_detail.getAttributes()
const pg_attributes = model.programme.getAttributes()

describe("createUrlList", () => {
	test("normal Url link with 5 params", () => {
		const sample = "/:id/:n/:num/:str/:l/:s"
		const result = createUrlList(sample)
		expect(result).toEqual([
			"/:id",
			"/:id/:n",
			"/:id/:n/:num",
			"/:id/:n/:num/:str",
			"/:id/:n/:num/:str/:l",
			"/:id/:n/:num/:str/:l/:s",
		])
	})
	test("normal Url link with 1 params", () => {
		const sample = "/:id/"
		const result = createUrlList(sample)
		expect(result).toEqual(["/:id/"])
	})
	test("normal Url link with 1 params + 2 static url", () => {
		const sample = "/:id/n/min"
		const result = createUrlList(sample)
		expect(result).toEqual(["/:id/n/min"])
	})
	test("normal Url link with 2 params + 2 static url", () => {
		const sample = "/:id/n/:min/l"
		const result = createUrlList(sample)
		expect(result).toEqual(["/:id/n", "/:id/n/:min/l"])
	})
})

describe("checkValidParam", () => {
	test("all attributes is success", () => {
		const sample = ["code", "programme_id", "name"]
		const attributes = programme.getAttributes()
		const result = checkValidParam(sample, attributes)
		expect(result).toEqual(["code", "programme_id", "name"])
	})
	test("all attributes is success course_detail", () => {
		const sample = ["name", "credit", "level", "exclusive", "remark"]
		const attributes = course_detail.getAttributes()
		const result = checkValidParam(sample, attributes)
		expect(result).toEqual(["name", "credit", "level", "exclusive", "remark"])
	})
	test("no sample is given", () => {
		const sample: Array<string> = undefined
		const attributes = programme.getAttributes()
		const result = checkValidParam(sample, attributes)
		expect(result).toEqual(undefined)
	})
	test("empty sample is given", () => {
		const sample: Array<string> = []
		const attributes = programme.getAttributes()
		const result = checkValidParam(sample, attributes)
		expect(result).toEqual(undefined)
	})
	test("empty attribute is given", () => {
		const sample: Array<string> = ["code", "name"]
		const attributes = {}
		const result = checkValidParam(sample, attributes)
		expect(result).toEqual(undefined)
	})
	test("some wrong sample is given", () => {
		const sample: Array<string> = ["code", "name", "bow", "alias"]
		const attributes = programme.getAttributes()
		const result = checkValidParam(sample, attributes)
		expect(result).toEqual(["code", "name", "alias"])
	})
	test("all wrong sample is given", () => {
		const sample: Array<string> = ["asd", "tooe", "bow", "ppq"]
		const attributes = programme.getAttributes()
		const result = checkValidParam(sample, attributes)
		expect(result).toEqual(undefined)
	})
})

describe("checkDataChanges", () => {
	test("normal data (2 columns changes)", async () => {
		const sample = normalSample
		const data = await modelSample
		const result = checkDataChanges(cd_attributes, sample, data)
		expect(result).toEqual(true)
	})
	test("same data with 3 body params", async () => {
		const sample = minimalSample
		const data = await modelSample
		const result = checkDataChanges(cd_attributes, sample, data)
		expect(result).toEqual(false)
	})
	test("1 different data", async () => {
		const sample = { course_id: 15, name: "Computer Graphics", credit: 3 }
		const data = await modelSample
		const result = checkDataChanges(cd_attributes, sample, data)
		expect(result).toEqual(true)
	})
	test("1 different data (programme)", async () => {
		const sample = {
			programme_id: 1,
			name: "Bachelor of Science with Honours in Computer Science",
			code: "BSVVW",
		}
		const data = await modelSample_pg
		const result = checkDataChanges(pg_attributes, sample, data)
		expect(result).toEqual(true)
	})
	test("no body params", async () => {
		const sample = {}
		const data = await modelSample
		const result = checkDataChanges(cd_attributes, sample, data)
		expect(result).toBe(false)
	})
	test("no data", async () => {
		const sample = minimalSample
		const data: course_detail = undefined
		const result = checkDataChanges(cd_attributes, sample, data)
		expect(result).toBe(false)
	})
})

describe("checkUnusedParam", () => {
	test("checkUnusedParam where all used", async () => {
		const sample = normalSample
		const result = checkUnusedParam(cd_attributes, sample)
		expect(result).toBe(false)
	})
	test("checkUnusedParam where none is used", async () => {
		const sample = { garbagex: 25, trashx: "boo" }
		const result = checkUnusedParam(cd_attributes, sample)
		expect(result).toEqual(["garbagex", "trashx"])
	})
	test("checkUnusedParam where partially used", async () => {
		const sample = { garbagex: 25, name: "CS2468" }
		const result = checkUnusedParam(cd_attributes, sample)
		expect(result).toEqual(["garbagex"])
	})
	test("checkUnusedParam where partially used (programme)", async () => {
		const sample = { garbagepg: 25, fund_mode: "UGC" }
		const result = checkUnusedParam(pg_attributes, sample)
		expect(result).toEqual(["garbagepg"])
	})
	test("checkUnusedParam where partially used (all)", async () => {
		const sample = {
			course_id: 25,
			course_detail_id: 12,
			name: "",
			garbagex: "",
			trashx: "",
		}
		const result = checkUnusedParam(cd_attributes, sample)
		expect(result).toEqual(["garbagex", "trashx"])
	})
	test("checkUnusedParam no parameter is passed", async () => {
		const sample = {}
		const result = checkUnusedParam(cd_attributes, sample)
		expect(result).toEqual(false)
	})
})

describe("util_checkAllType", () => {
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
	const nullList: Array<string> = []
	const allList = { numberList, stringList, booleanList, objectList, nullList }
	test("normalTest", () => {
		const samples = { course_id: 12, name: "sample", cef_course: true, duration: 3, remark: "" }
		const result = util_checkAllType(allList, samples)
		expect(result).toBe(true)
	})
	test("normalTest", () => {
		const samples = {
			course_id: "12",
			name: "sample",
			cef_course: true,
			duration: 3,
			remark: "",
		}
		const result = util_checkAllType(allList, samples)
		expect(result).toEqual("course_id")
	})
	test("normalTest", () => {
		const samples = { course_id: 12, name: 12, cef_course: 3, duration: 3, remark: "" }
		const result = util_checkAllType(allList, samples)
		expect(result).toEqual("name")
	})
})
