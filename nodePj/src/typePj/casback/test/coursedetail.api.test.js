import { describe } from "mocha"
import { spec, e2e } from "pactum"
import { like, eachLike, includes, regex } from "pactum-matchers"

const url = "http://localhost:3002/coursedetail"

const sampleResponse = {
	data: [
		{
			course_id: 19,
			code: "CS4348",
			dept: "CS",
			website: "",
			subject_area: "SE",
			course_details: [
				{
					course_id: 19,
					course_detail_id: 20,
					name: "Software Quality Management",
					credit: 3,
					duration: 1,
					level: "B4",
					medium: "English",
					cw_percent: 30,
					exam_duration: 2,
					precursor: "",
					prerequisite: "( CS3311 OR CS3342 OR CS3367 OR EQUIVALENT )",
					equivalent: "",
					exclusive: "",
					version: 1,
					cohort_from: 2009,
					cohort_to: 0,
				},
			],
		},
	],
	status: 200,
}

const sampleData = {
	course_id: 525,
	course_detail_id: 669,
	name: "Testing 103",
	credit: 3,
	duration: 1,
	level: "B4",
	medium: "English",
	cw_percent: 100,
	exam_duration: 2,
	precursor: "",
	prerequisite: "",
	equivalent: "",
	exclusive: "",
	version: 1,
	cohort_from: 2020,
	cohort_to: 0,
}
describe("Course_detail", () => {
	describe("GET", () => {
		it("get all course data", async () => {
			await spec()
				.get(url)
				.expectStatus(200)
				.expectJsonMatch({ data: eachLike({ name: like("") }) })
		})
		it("get specific data with id", async () => {
			await spec()
				.get(url + "/20")
				.expectStatus(200)
				.expectJsonMatch(sampleResponse)
		})
		it("get specific course data with name", async () => {
			await spec()
				.get(url + "/!/Software%20Quality%20Management/1")
				.expectStatus(200)
				.expectJsonMatch(sampleResponse)
		})
		it("get specific course data with Course ID", async () => {
			await spec()
				.get(url + "/!/!/!/19")
				.expectStatus(200)
				.expectJsonMatch({
					data: eachLike({
						course_details: eachLike(sampleResponse.data[0].course_details[0]),
					}),
				})
				.expectJsonLength("data.course_details", 2)
		})
		it("get specific course data with all parameters pressented", async () => {
			await spec()
				.get(url + "/20/Software%20Quality%20Management/1/19/CS4348/CS/SE")
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
	})

	describe("POST", () => {
		it("create course detail data", async () => {
			await spec()
				.delete(url + "/!/Testing%20Ultima")
				.withBody({ wipe: true })
			await spec()
				.post(url)
				.withJson({
					course_id: 526,
					name: "Testing Ultima",
					version: 1,
					level: "B10",
					cohort_from: 2020,
				})
				.expectStatus(201)
				.expectJsonMatch({
					data: like(sampleResponse.data[0].course_details[0]),
				})
		})
		it("create course data without crucial attribute", async () => {
			await spec()
				.post(url)
				.withJson({ course_id: 526 })
				.expectStatus(400)
				.expectJsonMatch({
					error: "Parameter is insufficient to create a new data",
				})
		})
		it("create course data without crucial attribute (course_id)", async () => {
			await spec()
				.post(url)
				.withJson({ name: "Testing Ultima" })
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
		it("create course data with incorrect attributes + delete with Id", async () => {
			await spec().delete(url + "/!/Testing%20Ultima%202")
			const res = await spec()
				.post(url)
				.withJson({
					course_id: 526,
					name: "Testing Ultima 2",
					level: "B10",
					cohort_from: 2020,
					subject_areas: "CS",
					ridiculous: true,
				})
				.expectStatus(201)
				.expectJsonMatch({
					warning: "[subject_areas,ridiculous] is not used",
					data: like(sampleResponse.data[0].course_details[0]),
				})

			const Id = res.json["data"].course_detail_id
			console.log(Id)

			await spec()
				.delete(url + `/${Id}`)
				.expectStatus(200)

			/* await spec()
			.delete(url + `/${Id}`)
			.withBody({ wipe: true })
			.expectStatus(200) */
		})
		it("create course data with incorrect data format", async () => {
			const sample = {
				name: "Testing Ultima2",
				course_id: "G",
				level: "B10",
				cohort_from: 2020,
			}
			await spec()
				.post(url)
				.withJson(sample)
				.expectStatus(400)
				.expectJsonMatch({
					error: `Invalid data type for key [course_id]`,
				})
		})
	})

	describe("PUT", () => {
		it("update data ", async () => {
			spec()
				.put(url + "/669")
				.withJson({})
			await spec()
				.put(url + "/669")
				.withJson({
					credit: 5,
				})
				.expectStatus(200)
				.expectJsonMatch({
					data: [
						{
							credit: 5,
						},
					],
				})
			await spec()
				.put(url + "/669")
				.withJson({
					credit: 3,
				})
		})
		it("update course data with same data", async () => {
			for (const [k, v] of Object.entries(sampleData)) {
				let sample = {}
				sample[k] = sampleData[k]
				await spec()
					.put(url + "/669")
					.withJson(sample)
					.expectStatus(208)
					.expectJsonMatch({
						warning: "There are no different between new and old data",
					})
			}
		})
		it("update course data with partially same data", async () => {
			await spec()
				.put(url + "/669")
				.withJson({ name: "Testing 103", credit: 5 })
				.expectStatus(200)
				.expectJsonMatch({
					data: [
						{
							name: "Testing 103",
							credit: 5,
						},
					],
				})
			await spec()
				.put(url + "/669")
				.withJson({
					credit: 3,
				})
		})
		it("bulk update non-unique data", async () => {
			await spec()
				.put(url + "/!/!/!/525")
				.withJson({ exam_percent: 10 })
				.expectStatus(200)
				.expectJsonLength("data", 4)
				.expectJsonMatch({ data: eachLike({ exam_percent: includes(10) }) })
			await spec()
				.put(url + "/!/!/!/525")
				.withJson({ exam_percent: 0 })
		})
		it("update non-existed data", async () => {
			await spec()
				.put(url + "/5000")
				.withJson({ name: "Testing 104" })
				.expectStatus(204)
		})
	})
	describe("DELETE", () => {
		it("delete (soft) course data with Course Code", async () => {
			await spec()
				.delete(url + "/!/Testing%20Ultima")
				.expectStatus(200)
		})

		it("delete (hard) course data Course Code", async () => {
			await spec()
				.delete(url + "/!/Testing%20Ultima")
				.withBody({ wipe: true })
				.expectStatus(200)
		})
		it("delete non-existing course data", async () => {
			await spec()
				.delete(url + "/5000")
				.expectStatus(204)
		})
		it("delete more than 1 course data", async () => {
			await spec()
				.delete(url + "/!/!/!/525")
				.expectStatus(200)
			await spec()
				.put(url + "/!/!/!/525")
				.withBody({ is_current: 1 })
		})
		it("delete (hard) more than 1 course data", async () => {
			await spec()
				.delete(url + "/!/!/!/525")
				.withBody({ wipe: true })
				.expectStatus(300)
				.expectJsonMatch({ error: "Too many entry fit the params" })
		})
	})
})
