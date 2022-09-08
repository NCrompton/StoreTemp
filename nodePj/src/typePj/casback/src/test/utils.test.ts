import { createUrlList } from "../utils/utils"
import { describe, expect, test, jest } from "@jest/globals"

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
