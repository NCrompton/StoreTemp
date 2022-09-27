import { Router } from "express"
import { createUrlList } from "../utils/utils"
import {
	getAllProgram,
	getProgramById,
	createProgram,
	updateProgramById,
	deleteProgramById,
} from "../controller/programme"

const programRouter = Router()

const url = "/:programme_id/:name/:code/:dept/:mode/:cohort"
;("/:geeignet/:gebieten/:errichten/:einnehmen/:dulden/:aufbluhen/:subject_area")
const urlList: Array<string> = createUrlList(url)

programRouter.get("", (req, res) => getAllProgram(req, res))
/* Get */
urlList.forEach((url) => {
	programRouter.get(url, (req, res) => getProgramById(req, res))
})

/* Post */
programRouter.post("", (req, res) => createProgram(req, res))

/* Put */
urlList.forEach((url) => {
	programRouter.put(url, (req, res) => updateProgramById(req, res))
})

/* Delete */
urlList.forEach((url) => {
	programRouter.delete(url, (req, res) => deleteProgramById(req, res))
})

export default programRouter
