import { describe, expect, test, jest } from "@jest/globals"
import { programme, model, prog_course_offer } from "../models/init-models"
import { Op } from "sequelize"
import {
	findAllDatafromJoin,
	createWhereStatement,
	findAllData,
	nonNullParams,
	checkIDType,
	checkAllTypes,
} from "../controller/prog_course_offer"

const normalSample = {
	prog_course_offer_id: 100,
	programme_id: 100,
	course_id: 100,
	code_remark: "",
	title_remark: "",
	unit_remark: "",
	prerequisite_remark: "",
	precursor_remark: "",
	equivalent_remark: "",
	equivalent_old_remark: "",
	exclusive_remark: "",
	offered_sem: "",
	remark: "",
	u_name: "CASback",
	r_host: "CASback",
	is_show_exclusive_with_title: 0,
}

const defaultSearch = ["prog_course_offer_id", "programme_id", "course_id", "offered_sem", "remark"]

const minimalSample = {
	prog_course_offer: 14,
	course_detail_id: 14,
	name: "Computer Graphics",
	cohort_from: 2009,
}

const requestSample = {
	prog_course_offer_id: "77",
	programme_id: "58",
	course_id: "105",
	name: "A",
	pcode: "P",
	fund_mode: "Mode",
	ccode: "C",
	dept: "TEST",
	subject_area: "TEST",
}
const requestSample2 = {
	prog_course_offer_id: 77,
	programme_id: 58,
	course_id: 105,
	pcode: "P",
	fund_mode: "Mode",
	ccode: "C",
	name: "A",
	dept: "TEST",
	subject_area: "TEST",
}
const whereSample = {
	wherestateChild: { prog_course_offer_id: 77, programme_id: 58, course_id: 105 },
	wherestateParent: {
		programme: { name: "A", code: "P", fund_mode: "Mode" },
		course: { dept: "TEST", code: "C", subject_area: "TEST" },
	},
}
const responseSample = {
	prog_course_offer_id: 77,
	course_id: 105,
	offered_sem: "A",
	programme_id: 58,
	remark: "* Effective from Sem A, 2010/11 and onwards.",
	programme: { name: "Minor in Computing" },
	course: { code: "CS2161", dept: "CS" },
}
const _model = model.prog_course_offer
type _model_type = prog_course_offer
let modelSample = async () =>
	await _model.findOne({
		where: { prog_course_offer_id: 77 },
	})
let modelCount = async () => await _model.count()

describe("createWhereState", () => {
	test("normal create", () => {
		const sample = requestSample2
		const result = createWhereStatement(sample)
		expect(result).toEqual(whereSample)
	})
	test("partial query create", () => {
		const sample = {
			prog_course_offer_id: 77,
			programme_id: 58,
			dept: "TEST",
		}
		const result = createWhereStatement(sample)
		expect(result).toEqual({
			wherestateChild: { prog_course_offer_id: 77, programme_id: 58 },
			wherestateParent: { course: { dept: "TEST" }, programme: {} },
		})
	})
	test("exclamated query create", () => {
		const sample = {
			prog_course_offer_id: 77,
			programme_id: "!",
			course_id: "!",
			name: "!",
			pcode: "!",
			fund_mode: "!",
			ccode: "!",
			dept: "!",
			subject_area: "!",
		}
		const result = createWhereStatement(sample)
		expect(result).toEqual({
			wherestateChild: { prog_course_offer_id: 77 },
			wherestateParent: { course: {}, programme: {} },
		})
	})
	test("extra query create", () => {
		const sample = {
			prog_course_offer_id: 77,
			programme_id: "!",
			course_id: "!",
			garbage: "Garbage",
		}
		const result = createWhereStatement(sample)
		expect(result).toEqual({
			wherestateChild: { prog_course_offer_id: 77 },
			wherestateParent: { course: {}, programme: {} },
		})
	})
	test("no query presented create", () => {
		const sample = {}
		const result = createWhereStatement(sample)
		expect(result).toEqual({
			wherestateChild: {},
			wherestateParent: { course: {}, programme: {} },
		})
	})
})

describe("findAllDataFromJoin", () => {
	test("normal test", async () => {
		const sample1 = { programme: { name: "Minor in Computing" }, course: { dept: "CS" } }
		const sample2 = {
			prog_course_offer_id: 77,
		}
		const result = await findAllDatafromJoin(sample1, sample2)
		expect(result.data[0].toJSON()).toEqual(responseSample)
	})
	test("normal test with attibutes", async () => {
		const sample1 = { programme: { name: "Minor in Computing" }, course: { dept: "CS" } }
		const sample2 = {
			prog_course_offer_id: 77,
		}
		const sample3 = defaultSearch
		const sample4 = { programme: ["name"], course: ["code", "dept"] }
		const result = await findAllDatafromJoin(sample1, sample2, sample3, sample4)
		expect(result.data[0].toJSON()).toEqual(responseSample)
	})
	test("normal test with empty parent where statement", async () => {
		const sample1 = { programme: {}, course: {} }
		const sample2 = {
			prog_course_offer_id: 77,
		}
		const sample3 = defaultSearch
		const sample4 = { programme: ["name"], course: ["code", "dept"] }
		const result = await findAllDatafromJoin(sample1, sample2, sample3, sample4)
		expect(result.data[0].toJSON()).toEqual(responseSample)
	})
	test("normal test without wherestate with attibutes", async () => {
		const sample3 = defaultSearch
		const sample4 = { programme: ["name"], course: ["code", "dept"] }
		const count = await modelCount()
		const result = await findAllDatafromJoin(undefined, undefined, sample3, sample4)
		expect(result.data[0].toJSON()).toEqual(responseSample)
		expect(result.data.length).toEqual(count)
	})
})

describe("findAllData", () => {
	test("normal test", async () => {
		const sample = { prog_course_offer_id: 77 }
		const result = await findAllData(sample)
		expect(result.data[0].toJSON()).toEqual({
			prog_course_offer_id: 77,
			course_id: 105,
			offered_sem: "A",
			programme_id: 58,
			remark: "* Effective from Sem A, 2010/11 and onwards.",
		})
	})
})
describe("nonNullParam", () => {
	test("normal test", () => {
		const sample = { prog_course_offer_id: 100, programme_id: 100, course_id: 100 }
		const result = nonNullParams(sample)
		expect(result).toEqual(normalSample)
	})
})
describe("checkIdType", () => {
	test("normal test", () => {
		const sample = { prog_course_offer_id: "10", programme_id: "100", course_id: "100" }
		const result = checkIDType(sample)
		expect(result).toEqual(true)
	})
	test("wrong id type", () => {
		const sample = { prog_course_offer_id: "10", programme_id: "b", course_id: "v" }
		const result = checkIDType(sample)
		expect(result).toEqual(false)
	})
})
describe("checkAllType", () => {
	test("normal test", () => {
		const sample = { normalSample }
		const result = checkAllTypes(sample)
		expect(result).toEqual(true)
	})
	test("wrong number type", () => {
		const sample = { course_id: "g", remark: 5 }
		const result = checkAllTypes(sample)
		expect(result).toEqual("course_id")
	})
	test("wrong boolean type", () => {
		const sample = { is_show_exclusive_with_title: 4 }
		const result = checkAllTypes(sample)
		expect(result).toEqual("is_show_exclusive_with_title")
	})
})
