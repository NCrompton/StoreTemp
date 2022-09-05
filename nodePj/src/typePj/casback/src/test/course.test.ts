import { describe, expect, test, jest } from "@jest/globals"
import axios from "axios"
import {
	createWhereStatement,
	checkUnusedParam,
	checkAllTypes,
	checkIDType,
	findAllCourse,
	checkValidParam,
	checkDataChanges,
} from "../controller/course"
import { course, model } from "../models/init-models"
import { Op } from "sequelize"

jest.mock("axios")
const url = "/course"

describe("createWhereStatement", () => {
	test("create where statement", async () => {
		const sample = { id: 25, code: "CS2115" }
		const result = createWhereStatement(sample)
		expect(result).toEqual({
			course_id: 25,
			code: "CS2115",
			website: { [Op.not]: "inactive" },
		})
	})
	test("test where statement (restore)", async () => {
		const sample = { id: 25, code: "CS2115" }
		const result = createWhereStatement(sample, true)
		expect(result).toEqual({
			course_id: 25,
			code: "CS2115",
		})
	})
	test("test where statement without data", async () => {
		const sample = {}
		const result = createWhereStatement(sample, true)
		expect(result).toEqual({})
	})
	test("test where statement with wrong attributes", async () => {
		const sample = { id: 25, code: "CS2468", codes: "CS2115" }
		const result = createWhereStatement(sample, true)
		expect(result).toEqual({
			course_id: 25,
			code: "CS2468",
		})
	})
	test("test where statement with !", async () => {
		const sample = { id: 25, code: "!" }
		const result = createWhereStatement(sample, true)
		expect(result).toEqual({
			course_id: 25,
		})
	})
})

describe("checkUnusedParam", () => {
	test("checkUnusedParam where all used", async () => {
		const sample = { course_id: 25, code: "CS2468" }
		const result = checkUnusedParam(sample)
		expect(result).toEqual(false)
	})
	test("checkUnusedParam where none is used", async () => {
		const sample = { ids: 25, codes: "CS2468" }
		const result = checkUnusedParam(sample)
		expect(result).toEqual([{ value: "ids" }, { value: "codes" }])
	})
	test("checkUnusedParam where partially used", async () => {
		const sample = { ids: 25, code: "CS2468" }
		const result = checkUnusedParam(sample)
		expect(result).toEqual([{ value: "ids" }])
	})
	test("checkUnusedParam where partially used (all)", async () => {
		const sample = {
			code: "CS2468",
			website: "",
			dept: "",
			subject_area: "",
			course_id: 12,
		}
		const result = checkUnusedParam(sample)
		expect(result).toEqual(false)
	})
})

describe("checkAllTypes", () => {
	test("input all correct types", async () => {
		const sample = {
			code: "CS2468",
			website: "",
			dept: "",
			subject_area: "",
			course_id: 12,
		}
		const result = checkAllTypes(sample)
		expect(result).toEqual(true)
	})
	test("input all incorrect types", async () => {
		const sample = {
			code: ["CS2468"],
			website: [""],
			dept: 12,
			subject_area: {},
		}
		const result = checkAllTypes(sample)
		expect(result).toEqual("code")
	})
	test("input incorrect code types", async () => {
		const sample = {
			code: ["CS2468"],
			website: "",
			dept: "",
			subject_area: "",
		}
		const result = checkAllTypes(sample)
		expect(result).toEqual("code")
	})
	test("input incorrect website types as object", async () => {
		const sample = {
			code: "CS2468",
			website: {},
			dept: "12",
			subject_area: "",
		}
		const result = checkAllTypes(sample)
		expect(result).toEqual("website")
	})
	test("input incorrect dept types", async () => {
		const sample = {
			code: "CS2468",
			website: "",
			dept: 12,
			subject_area: "",
		}
		const result = checkAllTypes(sample)
		expect(result).toEqual("dept")
	})
	test("input all nothing", async () => {
		const sample = {}
		const result = checkAllTypes(sample)
		expect(result).toEqual(true)
	})
})

describe("checkIdType", () => {
	test("input correct Id value", () => {
		const sample = { id: "12" }
		const result = checkIDType(sample)
		expect(result).toEqual(true)
	})
	test("input incorrect Id value", () => {
		const sample = { id: "g" }
		const result = checkIDType(sample)
		expect(result).toEqual(false)
	})
})

describe("checkValidParam", () => {
	test("all correct param", () => {
		const sample = {
			course_id: 12,
			code: "CS2115",
			dept: "CS",
			subject_area: "CS",
		}
		const result = checkValidParam(sample)
		expect(result).toEqual(["course_id", "code", "dept", "subject_area"])
		expect(result.length).toBe(4)
	})
	test("some correct param", () => {
		const sample = {
			course_id: 12,
			code: "CS2115",
		}
		const result = checkValidParam(sample)
		expect(result).toEqual(["course_id", "code"])
		expect(result.length).toBe(2)
	})
	test("all incorrect param", () => {
		const sample = {
			course_ids: 12,
			codes: "CS2115",
			depts: "CS",
			subject_areas: "CS",
		}
		const result = checkValidParam(sample)
		expect(result).toEqual(undefined)
	})
	test("partially incorrect param", () => {
		const sample = {
			course_ids: 12,
			code: "CS2115",
			subject_areas: "CS",
		}
		const result = checkValidParam(sample)
		expect(result).toEqual(["code"])
		expect(result.length).toBe(1)
	})
	test("all correct param (array)", () => {
		const sample = ["course_id", "code", "dept", "subject_area"]
		const result = checkValidParam(sample)
		expect(result).toEqual(["course_id", "code", "dept", "subject_area"])
		expect(result.length).toBe(4)
	})
	test("some correct param (array)", () => {
		const sample = ["course_id", "code"]
		const result = checkValidParam(sample)
		expect(result).toEqual(["course_id", "code"])
		expect(result.length).toBe(2)
	})
	test("all incorrect param (array)", () => {
		const sample = ["course_ids", "codes", "depts", "subject_areas"]
		const result = checkValidParam(sample)
		expect(result).toEqual(undefined)
	})
	test("partially incorrect param (array)", () => {
		const sample = ["course_ids", "code", "depts"]
		const result = checkValidParam(sample)
		expect(result).toEqual(["code"])
		expect(result.length).toBe(1)
	})
	test("undefined param (array)", () => {
		const sample: any = undefined
		const result = checkValidParam(sample)
		expect(result).toEqual(undefined)
	})
	test("empty param (array)", () => {
		const sample: Array<string> = []
		const result = checkValidParam(sample)
		expect(result).toEqual(undefined)
	})
})

describe("findAllCourse", () => {
	test("find course with id", async () => {
		const sample = { course_id: "12" }
		const result = await findAllCourse(sample)
		expect(result.data[0].toJSON()).toEqual({
			course_id: 12,
			code: "CS4290",
			dept: "CS",
			website: "",
			subject_area: "NET",
		})
		expect(result.status).toBe(200)
	})
	test("find course with code", async () => {
		const sample = { code: "CS2112" }
		const result = await findAllCourse(sample)
		expect(result.data[0].toJSON()).toEqual({
			course_id: 100,
			code: "CS2112",
			dept: "CS",
			website: "",
			subject_area: "",
		})
		expect(result.status).toBe(200)
	})
	test("find course with dept", async () => {
		const sample = { dept: "EN" }
		const result = await findAllCourse(sample)
		expect(result.data.length).toBeGreaterThan(1)
		result.data.forEach((v) => {
			expect(v.dept).toEqual("EN")
		})
		expect(result.status).toBe(200)
	})
	test("find course conflicting data", async () => {
		const sample = { course_id: 12, code: "CS2115" }
		const result = await findAllCourse(sample)
		expect(result.data.length).toBe(0)
		expect(result.status).toBe(204)
	})
	test("find course non-existing data", async () => {
		const sample = { course_id: 5000 }
		const result = await findAllCourse(sample)
		expect(result.data.length).toBe(0)
		expect(result.status).toBe(204)
	})
	test("show specific col of data", async () => {
		const sample = { course_id: 66 }
		const sample2 = ["course_id", "code"]
		const result = await findAllCourse(sample, sample2)
		expect(result.data[0].toJSON()).toEqual({
			course_id: 66,
			code: "WT0002",
		})
		expect(result.status).toBe(200)
	})
	test("show non-existing col of data", async () => {
		const sample = { course_id: 70 }
		const sample2 = ["course_ik", "codes"]
		const result = await findAllCourse(sample, sample2)
		expect(result.data[0].toJSON()).toEqual({
			course_id: 70,
			code: "CS2204",
			dept: "CS",
			website: "",
			subject_area: "NET",
		})
		expect(result.status).toBe(200)
	})
	test("no wherestatement and selectstatement", async () => {
		const sample = {}
		const sample2 = []
		const result = await findAllCourse()
		expect(result.status).toBe(200)
		expect(result.data.length).toBeGreaterThan(300)
	})
})

describe("checkDataChanges", () => {
	test("no different between data", () => {
		const sample = { code: "AB7777", dept: "TEST" }
		const target = course.build({
			course_id: 1000,
			code: "AB7777",
			dept: "TEST",
		})
		const result = checkDataChanges(sample, target)
		expect(result).toBe(false)
	})
	test("everything is different between data", () => {
		const sample = { code: "AB8888", dept: "TEST2" }
		const target = course.build({
			course_id: 1000,
			code: "AB7777",
			dept: "TEST",
		})
		const result = checkDataChanges(sample, target)
		expect(result).toBe(true)
	})
	test("some is different between data", () => {
		const sample = { code: "AB8888", dept: "TEST" }
		const target = course.build({
			course_id: 1000,
			code: "AB7777",
			dept: "TEST",
		})
		const result = checkDataChanges(sample, target)
		expect(result).toBe(true)
	})
})
