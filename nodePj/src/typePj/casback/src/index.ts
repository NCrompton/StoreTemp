import express from "express"
import approuter from "./routes/router"
import dotenv from "dotenv"
dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", approuter)

app.listen(3002, () => {
	console.log("server is running ")
})
