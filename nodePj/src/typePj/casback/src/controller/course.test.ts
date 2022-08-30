import { describe, expect, test } from "@jest/globals"
import {
	createCourse,
	getCourse,
	getCourseById,
	updateCourse,
	deleteCourse,
	sum,
} from "./course"

/* describe("get all course", () => {
	beforeEach(() => {
		jest.mock()
	})
})
 */

describe("sum module", () => {
	test("get all course", () => {
		expect(sum(1, 4)).toBe(5)
	})
})
