import { Router } from "express"
import courserouter from "./courserouter"

const router = Router()

router.use("/course", courserouter)

router.get("/", (req, res) => {
	res.send("rogered!")
})

export default router
