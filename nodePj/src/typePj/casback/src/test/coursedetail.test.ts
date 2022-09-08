import {
	findAllData,
	findAllDatafromJoin,
	createWhereStatement,
	checkIDType,
	checkUnusedParam,
	checkAllTypes,
} from "../controller/coursedetail"
import { describe, expect, test, jest } from "@jest/globals"

const normalSample = {
	course_id: 25,
	course_detail_id: 12,
	name: "",
	credit: 3,
	duration: 1,
	level: "B2",
	medium: "English",
	cw_percent: 100,
	exam_duration: 2,
	precursor: "( MA2144 OR MA2172 )",
	prerequisite: "( CS3102 OR CS3103 OR CS3161 OR EQUIVALENT )",
	equivalent: "( MA1002 AND MA1004 ) OR ( MA2013 )",
	exclusive: "( MA2182 OR MA2183 )",
	version: 1,
	is_current: 1,
	grade_pattern: "Standard (A+AA-...F)",
	cohort_from: 2020,
	cohort_to: 2022,
}

const minimalSample = {
	course_id: 25,
	course_detail_id: 12,
	name: "",
	cohort_from: 2020,
}

const requestSample = {
	course_detail_id: "12",
	name: "",
	version: "1",
	course_id: "25",
	code: "CS2468",
	dept: "TEST",
	subject_area: "TEST",
}

describe("findAllData", () => {
	test("get all data", () => {
		const sample = {}
		const result = findAllData(sample)
		expect(result)
	})
})

describe("createWhereStatement", () => {
	test("create where statement with all data present", () => {
		const sample = { name: "Hello", course_id: 1, id: 1 }
		const result = createWhereStatement(sample)
		expect(result).toEqual({
			course_id: 1,
			id: 1,
			name: "Hello",
		})
	})
	test("create where statement with all ! present", () => {
		const sample = { name: "!", course_id: "!", id: "!" }
		const result = createWhereStatement(sample)
		expect(result).toEqual({})
	})
	test("create where statement with some ! present", () => {
		const sample = { name: "!", course_id: 12, id: "!" }
		const result = createWhereStatement(sample)
		expect(result).toEqual({
			course_id: 12,
		})
	})
	test("create where statement with no data present", () => {
		const sample = {}
		const result = createWhereStatement(sample)
		expect(result).toEqual({})
	})
	test("create where statement with some data present", () => {
		const sample = { course_id: 1 }
		const result = createWhereStatement(sample)
		expect(result).toEqual({
			course_id: 1,
		})
	})
	test("create where statement with incorrect data present", () => {
		const sample = { course_id: 1, key: "" }
		const result = createWhereStatement(sample)
		expect(result).toEqual({
			course_id: 1,
		})
	})
})

describe("checkIDType", () => {
	test("requestSample test", () => {
		const sample = requestSample
		const result = checkIDType(sample)
		expect(result).toBe(true)
	})
	test("all id present with correct type", () => {
		const sample = { course_id: "5", id: "5", version: "1" }
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
	test("input incorrect name types", async () => {
		const sample = {
			name: ["CS2468"],
			level: "",
		}
		const result = checkAllTypes(sample)
		expect(result).toEqual("name")
	})
	test("input incorrect cw_percent types as object", async () => {
		const sample = {
			name: "",
			cw_percent: {},
		}
		const result = checkAllTypes(sample)
		expect(result).toEqual("cw_percent")
	})
	test("input incorrect medium types", async () => {
		const sample = {
			medium: 12,
			prerequisite: "",
		}
		const result = checkAllTypes(sample)
		expect(result).toEqual("medium")
	})
	test("input all nothing", async () => {
		const sample = {}
		const result = checkAllTypes(sample)
		expect(result).toEqual(true)
	})
	test("input non-existing boolean object", async () => {
		const sample = { bol: true }
		const result = checkAllTypes(sample)
		expect(result).toEqual(true)
	})
	test("input each number type incorrect loop", async () => {
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
		const result = numberList.map((sample) => {
			let data: { [key: string]: any } = {}
			data[sample] = 1
			expect(checkAllTypes(data)).toBe(true)
		})
	})
	test("input each number type incorrect loop", async () => {
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
		const result = stringList.map((sample) => {
			let data: { [key: string]: any } = {}
			data[sample] = ""
			expect(checkAllTypes(data)).toBe(true)
		})
	})
})
