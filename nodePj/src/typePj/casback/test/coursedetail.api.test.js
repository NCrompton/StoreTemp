import { describe } from "mocha"
import { spec, e2e } from "pactum"
import { like, eachLike, includes, regex } from "pactum-matchers"

const url = "http://localhost:3002/coursedetail"

describe("GET", () => {
	it("get all course data", async () => {
		await spec()
			.get(url)
			.expectStatus(200)
			.expectJsonMatch({ data: eachLike({ code: like("CS2115") }) })
	})
	it("get specific course data with id", async () => {
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
	/* !!!until here!!! */
	it("get specific course data with name", async () => {
		await spec()
			.get(url + "/Discrete%20Mathematics/")
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
