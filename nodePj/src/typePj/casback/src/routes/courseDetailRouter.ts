import { Router } from "express"
import {
	getCourseDetail,
	getCourseDetailById,
} from "../controller/coursedetail"
import { createUrlList } from "../utils/utils"

const courseDetailRouter = Router()

courseDetailRouter.get("", (req, res) => getCourseDetail(req, res))

const url =
	"/:course_detail_id/:name/:version/:course_id/:code/:dept/:subject_area"
const urlList = createUrlList(url)

/* Get */
urlList.forEach((url) =>
	courseDetailRouter.get(url, (req, res) => getCourseDetailById(req, res))
)

//courseDetailRouter.post("", (req, res) => changeCourseDetail(req, res))

/* update */
/* urlList.forEach((url) =>
	courseDetailRouter.put(url, (req, res) => updateCourseDetailById(req, res))
) */

/* delete */
/* urlList.forEach((url) =>
	courseDetailRouter.delete(url, (req, res) => deleteCourseDetailById(req, res))
) */

/* courseDetailRouter.get(
	"/:course_detail_id/:name/:course_id/:code/:dept/:subject_area",
	(req, res) => getCourseDetailById(req, res)
)
courseDetailRouter.get(
	"/:course_detail_id/:name/:course_id/:code/:dept/",
	(req, res) => getCourseDetailById(req, res)
)
courseDetailRouter.get(
	"/:course_detail_id/:name/:course_id/:code/",
	(req, res) => getCourseDetailById(req, res)
)
courseDetailRouter.get("/:course_detail_id/:name/:course_id/", (req, res) =>
	getCourseDetailById(req, res)
)
courseDetailRouter.get("/:course_detail_id/:name/", (req, res) =>
	getCourseDetailById(req, res)
)
courseDetailRouter.get("/:course_detail_id", (req, res) =>
	getCourseDetailById(req, res)
) */

export default courseDetailRouter
