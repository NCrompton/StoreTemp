import {
	findAllData,
	createWhereStatement,
	checkIDType,
	nonNullParams,
	checkUniqueParam,
	hasUniqueParam,
	checkRequiredParam,
} from "../controller/programme"
import { describe, expect, test, jest } from "@jest/globals"
import { programme, model } from "../models/init-models"
import { Op } from "sequelize"

const normalSample = {
	programme_id: 5,
	name: "Webteam Programme",
	award_title: "Webteam Programme",
	code: "BSCWT",
	alias: "BSCWT-2",
	dept: "WT",
	mode: "Full Time",
	fund_mode: "Mixed",
	cohort: 2009,
	intake: 50,
}

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

const minimalSample = {
	programme_id: 14,
	course_detail_id: 14,
	name: "Computer Graphics",
	cohort_from: 2009,
}

const requestSample = {
	programme_id: "5",
	name: "Webteam Programme",
	code: "BSCWT",
	dept: "WT",
	mode: "Mixed",
	cohort: "2009",
}
const requestSample2 = {
	programme_id: 5,
	name: "Webteam Programme",
	code: "BSCWT",
}
const _model = model.programme
type _model_type = programme
let modelSample = model.programme.findOne({
	where: { programme_id: 5 },
})

describe("findAllData", () => {
	test("get specific data", async () => {
		const sample = requestSample2
		const sample2 = ["name"]
		const result = await findAllData(sample, sample2)
		expect(result.data[0].toJSON()).toEqual({ name: "Webteam Programme" })
	})
	test("get non-existing data", async () => {
		const sample = { programme_id: 0 }
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
		const sample = { programme_id: 12, name: "Digitmon" }
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
		const sample = { name: "Hello", programme_id: 1, cohort: 1 }
		const result = createWhereStatement(sample)
		expect(result.wherestateChild).toEqual({
			programme_id: 1,
			name: "Hello",
			cohort: 1,
		})
	})
	test("create where statement with all ! present", () => {
		const sample = { name: "!", programme_id: "!", cohort: "!" }
		const result = createWhereStatement(sample)
		expect(result.wherestateChild).toEqual({})
	})
	test("create where statement with some ! present", () => {
		const sample = { name: "!", programme_id: 12, cohort: "!" }
		const result = createWhereStatement(sample)
		expect(result.wherestateChild).toEqual({
			programme_id: 12,
		})
	})
	test("create where statement with no data present", () => {
		const sample = {}
		const result = createWhereStatement(sample)
		expect(result.wherestateChild).toEqual({ })
	})
	test("create where statement with some data present", () => {
		const sample = { programme_id: 1 }
		const result = createWhereStatement(sample)
		expect(result.wherestateChild).toEqual({
			programme_id: 1,
		})
	})
	test("create where statement with incorrect data present", () => {
		const sample = { programme_id: 1, key: "" }
		const result = createWhereStatement(sample)
		expect(result.wherestateChild).toEqual({
			programme_id: 1,
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
		const sample = { programme_id: "f", cohort: "s" }
		const result = checkIDType(sample)
		expect(result).toBe(false)
	})
	test("all id present with some incorrect type (ID)", () => {
		const sample = { programme_id: "5", cohort: "s" }
		const result = checkIDType(sample)
		expect(result).toBe(false)
	})
	test("incorrect programme_id type", () => {
		const sample = { programme_id: "s" }
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
		const sample = { programme_id: "5", IK: "g", PL: "a" }
		const result = checkIDType(sample)
		expect(result).toBe(true)
	})
	test("some incorrect key presented and key type is incorrect", () => {
		const sample = { programme_id: "g", IK: "g", PL: "a" }
		const result = checkIDType(sample)
		expect(result).toBe(false)
	})
})

describe("nonNullParams", () => {
	test("all param presented", () => {
		const sample = normalSample
		const result = nonNullParams(sample)
		expect(result).toEqual(
			Object.assign(sample, {
				u_name: "CASback",
				r_host: "CASback",
			})
		)
	})
	test("no param presented", () => {
		const sample = {}
		const result = nonNullParams(sample)
		expect(result).toEqual({
			dept: "CS",
			fund_mode: "",
            intake: 0,
			u_name: "CASback",
			r_host: "CASback",
		})
	})
	test("some param presented", () => {
		const sample = {
			name: "",
			dept: "TEST",
		}
		const result = nonNullParams(sample)
		expect(result).toEqual({
			name: "",
            dept: "TEST",
            fund_mode: "",
            intake: 0,
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
		const sample = { programme_id: 14, name: "" }
		const result = checkRequiredParam(sample)
		expect(result).toBe(false)
	})
	test("no body parameters is passed", () => {
		const sample = {}
		const result = checkRequiredParam(sample)
		expect(result).toBe(false)
	})
	test("just the required parameter is passed", () => {
		const sample = { programme_id: 14, name: "", award_title: "", code: "", alias: "", dept: "", mode: "", cohort: 0,  }
		const result = checkRequiredParam(sample)
		expect(result).toBe(true)
	})
})
