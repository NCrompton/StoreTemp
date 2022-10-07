import { Router } from "express"
import { connectTo } from "./model"

const router = Router()

router.get("/", (req, res) => {
	return res.status(200).json({ status: 200, message: "connection is established" })
})

router.get("/data", (req, res) => connectTo())

export default router
