import { Router } from "express"
import {
	getCourseDetail,
	getCourseDetailById,
	createCourseDetail,
	updateCourseDetailById,
	deleteCourseDetailById,
} from "../controller/coursedetail"
import { createUrlList } from "../utils/utils"

const courseDetailRouter = Router()

courseDetailRouter.get("", (req, res) => getCourseDetail(req, res))

const url = "/:id/:name/:version/:course_id/:code/:dept/:subject_area"
const urlList = createUrlList(url)

/* get */
urlList.forEach((url) =>
	courseDetailRouter.get(url, (req, res) => getCourseDetailById(req, res))
)

/* create */
courseDetailRouter.post("", (req, res) => createCourseDetail(req, res))

/* update */
urlList.forEach((url) =>
	courseDetailRouter.put(url, (req, res) => updateCourseDetailById(req, res))
)

/* delete */
urlList.forEach((url) =>
	courseDetailRouter.delete(url, (req, res) => deleteCourseDetailById(req, res))
)

export default courseDetailRouter
