import { describe } from "mocha"
import { spec, e2e } from "pactum"
import { like, eachLike, includes, regex } from "pactum-matchers"

const url = "http://localhost:3002/course"

describe("GET", () => {
	it("get all course data", async () => {
		await spec()
			.get(url)
			.expectStatus(200)
			.expectJsonMatch({ data: eachLike({ code: like("CS2115") }) })
	})
	it("get specific course data with CourseID", async () => {
		await spec()
			.get(url + "/64")
			.expectStatus(200)
			.expectJsonMatch({
				data: [
					{
						course_id: 64,
						code: "WT0001",
						dept: "WT",
						website: "http://www.cs.cityu.edu.hk/",
						subject_area: "ALL",
					},
				],
			})
	})
	it("get specific course data with Course Code", async () => {
		await spec()
			.get(url + "/!/CS3335/!")
			.expectStatus(200)
			.expectJsonMatch({
				data: [
					{
						course_id: 178,
						code: "CS3335",
						dept: "CS",
						website: "",
						subject_area: "",
					},
				],
			})
	})
	it("get specific course data with Department", async () => {
		await spec()
			.get(url + "/!/!/EN")
			.expectStatus(200)
			.expectJsonMatch({
				data: eachLike({
					course_id: like(1),
					code: like("CS2115"),
					dept: includes("EN"),
					website: like(""),
					subject_area: like("CS"),
				}),
			})
			.expectJsonLength("data", 2)
	})
	it("get specific course data with all 3 parameters pressented", async () => {
		await spec()
			.get(url + "/86/CS4293/CS")
			.expectStatus(200)
			.expectJsonMatch({
				data: [
					{
						course_id: 86,
						code: "CS4293",
						dept: "CS",
						website: "",
						subject_area: "NET",
					},
				],
			})
	})
	it("get non-existing course data", async () => {
		await spec()
			.get(url + "/5000")
			.expectStatus(204)
	})
	it("get course data with incorrect query format", async () => {
		await spec()
			.get(url + "/g")
			.expectStatus(400)
	})
})

describe("POST", () => {
	it("create course data", async () => {
		await spec()
			.post(url)
			.withJson({ code: "AB7777", dept: "Test", subject_area: "Test" })
			.expectStatus(201)
			.expectJsonMatch({
				data: {
					course_id: like(1),
					code: "AB7777",
					dept: "Test",
					website: "",
					subject_area: "Test",
				},
			})
	})
	it("create course data without crucial attribute (code)", async () => {
		await spec()
			.post(url)
			.withJson({ dept: "CS" })
			.expectStatus(400)
			.expectJsonMatch({
				error: "Parameter is insufficient to create a new data",
			})
	})
	it("create course data without crucial attribute (dept)", async () => {
		await spec()
			.post(url)
			.withJson({ code: "AB7777" })
			.expectStatus(400)
			.expectJsonMatch({
				error: "Parameter is insufficient to create a new data",
			})
	})
	it("create course data without providing body", async () => {
		await spec().post(url).expectStatus(400).expectJsonMatch({
			error: "Parameter is insufficient to create a new data",
		})
	})
	it("create course data with incorrect attributes + delete with CourseId", async () => {
		const res = await spec()
			.post(url)
			.withJson({
				code: "AB9999",
				dept: "Test",
				subject_areas: "CS",
				ridiculous: true,
			})
			.expectStatus(201)
			.expectJsonMatch({
				warning: "[subject_areas,ridiculous] is not used",
				data: {
					course_id: like(1),
					code: "AB9999",
					dept: "Test",
					website: "",
					subject_area: "",
				},
			})

		const CourseId = res.json["data"].course_id

		await spec()
			.delete(url + `/${CourseId}`)
			.expectStatus(200)

		await spec()
			.delete(url + `/${CourseId}`)
			.withBody({ wipe: true })
			.expectStatus(200)
	})
	it("create course data with duplicate data", async () => {
		const sampleList = ["CS2115", "AB7777", "CS3334"]
		for (let s of sampleList) {
			await spec()
				.post(url)
				.withJson({ code: s, dept: "Test", subject_area: "Test" })
				.expectStatus(409)
				.expectJsonMatch({
					error: regex(/^Data\swith\sCode\s[A-Z]+[0-9]+/),
				})
		}
	})
	it("create course data with incorrect data format", async () => {
		const samples = [
			{ code: 5, dept: "T" },
			{ code: "T1", dept: 2 },
			{ code: "T2", dept: "TEST", subject_area: [] },
		]
		const checks = ["code", "dept", "subject_area"]
		for (const [index, sample] of samples.entries()) {
			await spec()
				.post(url)
				.withJson(sample)
				.expectStatus(400)
				.expectJsonMatch({
					error: `Invalid data type for key [${checks[index]}]`,
				})
		}
	})
})

describe("PUT", () => {
	it("update course data ", async () => {
		spec()
			.put(url + "/436")
			.withJson({
				code: "AB7777",
				dept: "TEST",
				website: "Test.com",
				subject_area: "TEST",
			})
		await spec()
			.put(url + "/436")
			.withJson({
				code: "AB6666",
				dept: "TEST2",
				website: "",
				subject_area: "TEST2",
			})
			.expectStatus(200)
			.expectJsonMatch({
				data: {
					course_id: 436,
					code: "AB6666",
					dept: "TEST2",
					website: "",
					subject_area: "TEST2",
				},
			})
	})
	it("update course data with same course code", async () => {
		await spec()
			.put(url + "/436")
			.withJson({ code: "AB6666", dept: "TEST" })
			.expectStatus(409)
			.expectJsonMatch({
				error: "Course with name AB6666 already existed",
			})
	})
	it("update course data with same course dept", async () => {
		await spec()
			.put(url + "/436")
			.withJson({ dept: "TEST2" })
			.expectStatus(208)
			.expectJsonMatch({
				warning: "There are no different between new and old data",
			})
	})
	it("update course data with partially same data", async () => {
		await spec()
			.put(url + "/436")
			.withJson({ code: "AB5555", dept: "TEST", website: "Test.com" })
			.expectStatus(200)
			.expectJsonMatch({
				data: {
					course_id: 436,
					code: "AB5555",
					dept: "TEST",
					website: "Test.com",
					subject_area: "TEST2",
				},
			})
	})
	it("update course data with non-unique course code", async () => {
		await spec()
			.put(url + "/436")
			.withJson({ code: "CS1237" })
			.expectStatus(409)
			.expectJsonMatch({
				error: "Course with name CS1237 already existed",
			})
	})
	it("bulk update data code with dept", async () => {
		await spec()
			.put(url + "/!/EN")
			.withJson({ code: "ABC1111" })
			.expectStatus(300)
			.expectJsonMatch({
				error: "Too many entry fit the params",
			})
	})
	it("bulk update data dept with subject_area", async () => {
		await spec()
			.put(url + "/!/!/TEST")
			.withJson({ dept: "TEST3" })
			.expectStatus(300)
			.expectJsonMatch({
				error: "Too many entry fit the params",
			})
	})
	it("update non-existed data", async () => {
		await spec()
			.put(url + "/5000")
			.withJson({ code: "ABC1111" })
			.expectStatus(204)
			.expectJsonMatch({})
	})
	it("update non-existed data with existing name", async () => {
		await spec()
			.put(url + "/5000")
			.withJson({ code: "AB7777" })
			.expectStatus(204)
			.expectJsonMatch({})
	})
})

describe("DELETE", () => {
	it("delete (soft) course data with Course Code", async () => {
		await spec()
			.delete(url + "/!/AB7777")
			.expectStatus(200)
	})

	it("delete (hard) course data Course Code", async () => {
		await spec()
			.delete(url + "/!/AB7777")
			.withBody({ wipe: true })
			.expectStatus(200)
	})
})
