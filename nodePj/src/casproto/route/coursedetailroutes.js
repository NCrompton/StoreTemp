import express from 'express'
import {findCourseDetail, listAllCourse} from '../model/coursedetail.js'

var router = express.Router();

router.get('/', (req, res) => findCourseDetail(req, res))

router.get('/all', (req, res) => listAllCourse(req, res))

export default router;