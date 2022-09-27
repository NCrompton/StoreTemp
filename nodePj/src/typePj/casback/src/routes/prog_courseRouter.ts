import { Router } from "express"
import { createUrlList } from "../utils/utils"
import {
	getProgCourseById,
	getAllProgCourse,
	createProgCourse,
	updateProgCourseById,
	deleteProgCourseById,
} from "../controller/prog_course_offer"

const prog_courseRouter = Router()

prog_courseRouter.get("", (req, res) => getAllProgCourse(req, res))

const url =
	"/:prog_course_offer_id/:programme_id/:course_id/:offered_sem/:name/:pcode/:fund_mode/:ccode/:dept/:subject_area"
const urlList: Array<string> = createUrlList(url)

/* Get */
urlList.forEach((url) => {
	prog_courseRouter.get(url, (req, res) => getProgCourseById(req, res))
})

/* Post */
prog_courseRouter.post("", (req, res) => createProgCourse(req, res))

/* Put */
urlList.forEach((url) => {
	prog_courseRouter.put(url, (req, res) => updateProgCourseById(req, res))
})

/* Delete */
urlList.forEach((url) => {
	prog_courseRouter.delete(url, (req, res) => deleteProgCourseById(req, res))
})

export default prog_courseRouter
