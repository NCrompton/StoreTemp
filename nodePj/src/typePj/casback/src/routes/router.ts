import { Router } from "express"
import courserouter from "./courserouter"
import courseDetailRouter from "./courseDetailRouter"

const router = Router()

router.use("/course", courserouter)
router.use("/coursedetail", courseDetailRouter)

router.get("/", (req, res) => {
	res.send("rogered!")
})

export default router
