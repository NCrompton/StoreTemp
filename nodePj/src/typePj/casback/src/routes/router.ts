import { Router } from "express"
import courserouter from "./courserouter"
import courseDetailRouter from "./courseDetailRouter"
import programRouter from "./programmeRouter"
import prog_courseRouter from "./prog_courseRouter"

const router = Router()

router.use("/course", courserouter)
router.use("/coursedetail", courseDetailRouter)
router.use("/programme", programRouter)
router.use("/prog_course", prog_courseRouter)

router.get("/", (req, res) => {
	res.send("rogered!")
})

export default router
