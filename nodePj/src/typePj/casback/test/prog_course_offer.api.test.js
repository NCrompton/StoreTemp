import { describe } from "mocha"
import { spec, e2e } from "pactum"
import { like, eachLike, includes, regex } from "pactum-matchers"

const url = "http://localhost:3002/prog_course"

const testId = "/77"
const testDataId = "/216"

const sampleResponse = {
	data: [
		{
			prog_course_offer_id: 77,
			programme_id: 58,
			course_id: 105,
			offered_sem: "A",
			remark: "* Effective from Sem A, 2010/11 and onwards.",
			programme: {
				name: "Minor in Computing",
			},
			course: {
				code: "CS2161",
				dept: "CS",
			},
		},
	],
}

const sampleResponse2 = {
	data: [
		{
			prog_course_offer_id: 77,
			programme_id: 58,
			course_id: 105,
			code_remark: "",
			title_remark: "(testing)",
			unit_remark: "",
			prerequisite_remark: "",
			precursor_remark: "",
			equivalent_remark: "",
			equivalent_old_remark: "",
			exclusive_remark: "*",
			offered_sem: "A",
			remark: "* Effective from Sem A, 2010/11 and onwards.",
			u_name: "cas",
			r_host: "z1f.cs.cityu.edu.hk",
			is_show_exclusive_with_title: 1,
		},
	],
	status: 200,
}

const sampleData = {
	prog_course_offer_id: 216,
	programme_id: 69,
	course_id: 525,
	unit_remark: "Unit Test",
	prerequisite_remark: "Pre Test",
	offered_sem: "TestingM",
	remark: "Test Data",
	code_remark: "",
	title_remark: "",
	precursor_remark: "",
	equivalent_remark: "",
	equivalent_old_remark: "",
	exclusive_remark: "",
	u_name: "CASback",
	r_host: "CASback",
	is_show_exclusive_with_title: false,
}

describe("prog_course", () => {
	describe("GET", () => {
		it("get all course data", async () => {
			await spec()
				.get(url)
				.expectStatus(200)
				.expectJsonMatch({
					data: eachLike({
						prog_course_offer_id: like(0),
						programme: { name: like("") },
						course: { code: like("") },
					}),
				})
		})
		it("get specific data with id", async () => {
			await spec()
				.get(url + testId)
				.expectStatus(200)
				.expectJsonMatch(sampleResponse)
		})
		it("get specific course data with offered_sem", async () => {
			await spec()
				.get(url + "/!/!/!/A")
				.expectStatus(200)
				.expectJsonMatch({
					data: eachLike({
						prog_course_offer_id: 77,
						programme_id: 58,
						course_id: 105,
						offered_sem: "A",
						remark: "* Effective from Sem A, 2010/11 and onwards.",
						programme: like({
							name: "Minor in Computing",
						}),
						course: like({
							code: "CS2161",
							dept: "CS",
						}),
					}),
				})
				.expectJsonLength("data", 4)
		})
		it("get specific course data with programme name", async () => {
			await spec()
				.get(url + "/!/!/!/!/Minor%20in%20Computing")
				.expectStatus(200)
				.expectJsonLength("data", 35)
		})
		it("get specific course data with course code", async () => {
			await spec()
				.get(url + "/!/!/!/!/!/!/!/CS2161")
				.expectStatus(200)
				.expectJsonMatch(sampleResponse)
		})
		it("get specific course data with all parameters pressented", async () => {
			await spec()
				.get(url + "/77/58/105/A/Minor%20in%20Computing/MINOR/%20/CS2161/CS/%20")
				.expectStatus(200)
				.expectJsonMatch(sampleResponse)
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
		it("get course data with specified attributes", async () => {
			await spec()
				.get(url + testId)
				.withBody({
					select: ["prog_course_offer_id"],
					selectParent: { programme: ["name", "code"], course: ["code", "dept"] },
				})
				.expectStatus(200)
				.expectJsonMatch({
					data: [
						{
							prog_course_offer_id: 77,
							programme: {
								name: "Minor in Computing",
								code: "MINOR",
							},
							course: {
								code: "CS2161",
								dept: "CS",
							},
						},
					],
				})
		})
	})

	describe("POST", () => {
		it("create programme data", async () => {
			await spec()
				.delete(url + "/!/!/!/TestingT")
				.withBody({ wipe: true })
			const res = await spec()
				.post(url)
				.withJson({
					programme_id: 69,
					course_id: 525,
					unit_remark: "Unit Test",
					prerequisite_remark: "Pre Test",
					offered_sem: "TestingT",
					remark: "Test Data",
				})
				.expectStatus(201)
				.expectJsonMatch({
					data: like(sampleData),
				})
			const Id = res.json["data"].programme_id
			console.log(Id)
		})
		it("create course data without crucial attribute", async () => {
			await spec().post(url).withJson({ course_id: 525 }).expectStatus(400).expectJsonMatch({
				error: "Parameter is insufficient to create a new data",
			})
		})
		it("create course data without crucial attribute (course_id)", async () => {
			await spec()
				.post(url)
				.withJson({ programme_id: 69 })
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
		it("create course data with incorrect attributes", async () => {
			await spec()
				.delete(url + "/!/!/!/TestingT")
				.withBody({ wipe: true })
			const res = await spec()
				.post(url)
				.withJson({
					programme_id: 69,
					course_id: 525,
					unit_remark: "Unit Test2",
					prerequisite_remark: "Pre Test2",
					offered_sem: "TestingT",
					remark: "Test Data 2",
					verfassung: "",
				})
				.expectStatus(201)
				.expectJsonMatch({
					warning: "[verfassung] is not used",
					data: like(sampleData),
				})

			const Id = res.json["data"].programme_id
			console.log(Id)
		})
		it("create course data with incorrect data format", async () => {
			const sample = {
				programme_id: "69",
				course_id: "525",
				unit_remark: "Unit Test2",
				prerequisite_remark: "Pre Test2",
				offered_sem: "TestingT",
				remark: "Test Data 2",
			}
			await spec().post(url).withJson(sample).expectStatus(400).expectJsonMatch({
				error: `Invalid data type for key [programme_id]`,
			})
		})
	})

	describe("PUT", () => {
		it("update data ", async () => {
			await spec()
				.put(url + testDataId)
				.withJson({
					remark: "Changed Test data",
				})
				.expectStatus(200)
				.expectJsonMatch({
					data: [
						{
							remark: "Changed Test data",
						},
					],
				})
			await spec()
				.put(url + testDataId)
				.withJson({
					remark: "Test Data",
				})
		})
		it("update course data with same data", async () => {
			for (const [k, v] of Object.entries(sampleData)) {
				let sample = {}
				sample[k] = v
				await spec()
					.put(url + testDataId)
					.withJson(sample)
					.expectStatus(208)
					.expectJsonMatch({
						warning: "There are no different between new and old data",
					})
			}
		})
		it("update course data with partially same data", async () => {
			await spec()
				.put(url + testDataId)
				.withJson({ unit_remark: "Unit Test", remark: "Changed Test data 2" })
				.expectStatus(200)
				.expectJsonMatch({
					data: [
						{
							unit_remark: "Unit Test",
							remark: "Changed Test data 2",
						},
					],
				})
			await spec()
				.put(url + testDataId)
				.withJson({
					remark: "Test Data",
				})
		})
		it("bulk update non-unique data", async () => {
			await spec()
				.put(url + "/!/!/525")
				.withJson({ remark: "Changed Test data 3" })
				.expectStatus(200)
				.expectJsonLength("data", 2)
				.expectJsonMatch({ data: eachLike({ remark: includes("Changed Test data 3") }) })
			await spec()
				.put(url + "/!/!/525")
				.withJson({ remark: "Test Data" })
		})
		it("update non-existed data", async () => {
			await spec()
				.put(url + "/5000")
				.withJson({ remark: "Non-exist Test Data" })
				.expectStatus(204)
		})
	})
	describe("DELETE", () => {
		it("delete (soft) course data with prog_course_id", async () => {
			await spec()
				.delete(url + "/77")
				.expectStatus(400)
				.expectJsonMatch({ error: "Programme data cannot be deleted" })
		})
		/* it("delete (hard) more than 1 course data", async () => {
			await spec()
				.delete(url + "/!/!/525")
				.withBody({ wipe: true })
				.expectStatus(300)
				.expectJsonMatch({ error: "Too many entry fit the params" })
		}) */
		it("delete (hard) course data Course Code", async () => {
			await spec()
				.delete(url + "/!/!/!/TestingT")
				.withBody({ wipe: true })
				.expectStatus(200)
		})
		it("delete non-existing course data", async () => {
			await spec()
				.delete(url + "/5000")
				.expectStatus(400)
				.expectJsonMatch({ error: "Programme data cannot be deleted" })
		})
		it("delete more than 1 course data", async () => {
			await spec()
				.delete(url + "/!/!/!/TestingT")
				.expectStatus(400)
				.expectJsonMatch({ error: "Programme data cannot be deleted" })
		})

		it("delete (hard) non-exist data", async () => {
			await spec()
				.delete(url + "/!/!/!/TESTNON")
				.withBody({ wipe: true })
				.expectStatus(204)
		})
	})
})
