import express from "express"
import router from "./router"
import dotenv from "dotenv"

const app = express()
dotenv.config()
console.log(process.env)

app.use(router)
app.listen(4700)
