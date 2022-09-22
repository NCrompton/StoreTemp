import { Router } from "express"
import courserouter from "./courserouter"
import courseDetailRouter from "./courseDetailRouter"
import programRouter from "./programmeRouter"

const router = Router()

router.use("/course", courserouter)
router.use("/coursedetail", courseDetailRouter)
router.use("/programme", programRouter)

router.get("/", (req, res) => {
	res.send("rogered!")
})

export default router
