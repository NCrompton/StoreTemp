import { describe } from "mocha"
import { spec, e2e } from "pactum"
import { like, eachLike, includes, regex } from "pactum-matchers"

const url = "http://localhost:3002/programme"

const testId = "/5"
const testDataId = "/69"

const sampleResponse = {
	data: [
		{
			programme_id: 5,
			name: "Webteam Programme",
			award_title: "Webteam Programme",
			code: "BSCWT",
			alias: "BSCWT-2",
			dept: "WT",
			mode: "Full Time",
			fund_mode: "Mixed",
			cohort: "2009",
			intake: "50",
		},
	],
	status: 200,
}

const sampleData = {
	programme_id: 69,
	name: "Testing Programme 3",
	award_title: "Testing Programme 3",
	code: "Test3",
	alias: "Test3",
	mode: "Test",
	//cohort: "1492",
	dept: "TESTM",
	fund_mode: "",
}

describe("Programme", () => {
	describe("GET", () => {
		it("get all course data", async () => {
			await spec()
				.get(url)
				.expectStatus(200)
				.expectJsonMatch({ data: eachLike({ name: like("") }) })
		})
		it("get specific data with id", async () => {
			await spec()
				.get(url + testId)
				.expectStatus(200)
				.expectJsonMatch(sampleResponse)
		})
		it("get specific course data with name", async () => {
			await spec()
				.get(url + "/!/Webteam%20Programme/BSCWT")
				.expectStatus(200)
				.expectJsonMatch({ data: eachLike(sampleData) })
		})
		it("get specific course data with dept", async () => {
			await spec()
				.get(url + "/!/!/!/CS")
				.expectStatus(200)
				.expectJsonMatch({
					data: eachLike(sampleResponse.data[0]),
				})
				.expectJsonLength("data", 20)
		})
		it("get specific course data with all parameters pressented", async () => {
			await spec()
				.get(url + "/5/Webteam%20Programme/BSCWT/WT/Full%20Time/2009")
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
		it("get course data with bracket in query", async () => {
			await spec()
				.get(
					url +
						"/!/Master%20of%20Philosophy%20(Computer%20Science%20and%20Digital%20Media)"
				)
				.expectStatus(200)
				.expectJsonMatch({ data: [{ programme_id: 48 }] })
		})
	})

	describe("POST", () => {
		it("create programme data", async () => {
			await spec()
				.delete(url + "/!/Testing%20Programme")
				.withBody({ wipe: true })
			await spec()
				.post(url)
				.withJson({
					name: "Testing Programme",
					award_title: "Testing Programme",
					code: "TEST1",
					alias: "TEST1",
					mode: "Test",
					dept: "TEST",
					cohort: 1492,
				})
				.expectStatus(201)
				.expectJsonMatch({
					data: like(sampleData),
				})
		})
		it("create course data without crucial attribute", async () => {
			await spec()
				.post(url)
				.withJson({ name: "Testing Programme" })
				.expectStatus(400)
				.expectJsonMatch({
					error: "Parameter is insufficient to create a new data",
				})
		})
		it("create course data without crucial attribute (name)", async () => {
			await spec().post(url).withJson({ code: "TEST" }).expectStatus(400).expectJsonMatch({
				error: "Parameter is insufficient to create a new data",
			})
		})
		it("create course data without providing body", async () => {
			await spec().post(url).expectStatus(400).expectJsonMatch({
				error: "Parameter is insufficient to create a new data",
			})
		})
		it("create course data with incorrect attributes + delete with Id", async () => {
			await spec()
				.delete(url + "/!/!/TEST2")
				.withBody({ wipe: true })
			const res = await spec()
				.post(url)
				.withJson({
					name: "Testing Programme 2",
					award_title: "Testing Programme 2",
					code: "TEST2",
					alias: "TEST2",
					mode: "Test",
					dept: "TEST",
					cohort: 1492,
					verfassung: "",
				})
				.expectStatus(201)
				.expectJsonMatch({
					warning: "[verfassung] is not used",
					data: like(sampleData),
				})

			const Id = res.json["data"].programme_id
			console.log(Id)

			/* await spec()
        .delete(url + `/${Id}`)
        .expectStatus(200)

      await spec()
			.delete(url + `/${Id}`)
			.withBody({ wipe: true })
			.expectStatus(200) */
		})
		it("create course data with incorrect data format", async () => {
			const sample = {
				name: "Testing Programme 3",
				award_title: "Testing Programme 3",
				code: "TEST",
				alias: "TEST",
				mode: "Test",
				dept: "TEST",
				cohort: "1453",
			}
			await spec().post(url).withJson(sample).expectStatus(400).expectJsonMatch({
				error: `Invalid data type for key [cohort]`,
			})
		})
	})

	describe("PUT", () => {
		it("update data ", async () => {
			await spec()
				.put(url + testDataId)
				.withJson({
					intake: 5,
				})
				.expectStatus(200)
				.expectJsonMatch({
					data: [
						{
							intake: 5,
						},
					],
				})
			await spec()
				.put(url + testDataId)
				.withJson({
					intake: 0,
				})
		})
		it("update course data with same data", async () => {
			for (const [k, v] of Object.entries(sampleData)) {
				let sample = {}
				sample[k] = sampleData[k]
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
				.withJson({ name: "Testing Programme 3", intake: 50 })
				.expectStatus(200)
				.expectJsonMatch({
					data: [
						{
							name: "Testing Programme 3",
							intake: 50,
						},
					],
				})
			await spec()
				.put(url + testDataId)
				.withJson({
					intake: 0,
				})
		})
		it("bulk update non-unique data", async () => {
			await spec()
				.put(url + "/!/!/!/TEST")
				.withJson({ intake: 10 })
				.expectStatus(200)
				.expectJsonLength("data", 3)
				.expectJsonMatch({ data: eachLike({ intake: includes(10) }) })
			await spec()
				.put(url + "/!/!/!/TEST")
				.withJson({ intake: 0 })
		})
		it("update non-existed data", async () => {
			await spec()
				.put(url + "/5000")
				.withJson({ name: "Testing Programme 4" })
				.expectStatus(204)
		})
	})
	describe("DELETE", () => {
		it("delete (soft) course data with Course Code", async () => {
			await spec()
				.delete(url + "/!/Testing%20Programme")
				.expectStatus(400)
				.expectJsonMatch({ error: "Programme data cannot be deleted" })
		})
		it("delete (hard) more than 1 course data", async () => {
			await spec()
				.delete(url + "/!/!/!/TEST")
				.withBody({ wipe: true })
				.expectStatus(300)
				.expectJsonMatch({ error: "Too many entry fit the params" })
		})
		it("delete (hard) course data Course Code", async () => {
			await spec()
				.delete(url + "/!/Testing%20Programme")
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
				.delete(url + "/!/!/!/TEST")
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
