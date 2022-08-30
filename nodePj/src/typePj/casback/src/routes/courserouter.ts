import { Router } from "express"
import { Sequelize, DataType, Model } from "sequelize"
import config from "dotenv/config"
import { sequelize } from "../utils/db"
import { model } from "../models/init-models"
import {
	getCourseById,
	createCourse,
	updateCourse,
	deleteCourse,
	getCourse,
} from "../controller/course"
config

const router = Router()

router.get("", (req, res) => getCourse(req, res))

router.get("/:id/", (req, res) => getCourseById(req, res))
router.get("/:id/:code/", (req, res) => getCourseById(req, res))
router.get("/:id/:code/:dept", (req, res) => getCourseById(req, res))

router.post("/", (req, res) => createCourse(req, res))

router.put("/:id", (req, res) => updateCourse(req, res))
router.put("/:id/:code", (req, res) => updateCourse(req, res))
router.put("/:id/:code/:dept", (req, res) => updateCourse(req, res))

router.delete("/:id", (req, res) => deleteCourse(req, res))
router.delete("/:id/:code", (req, res) => deleteCourse(req, res))
router.delete("/:id/:code/:dept", (req, res) => deleteCourse(req, res))

export default router
