import express from 'express'
import {listCourse, findCourse, createCourse} from '../model/course.js'

var router = express.Router();

router.get('/', (req, res) => findCourse(req, res));

router.post('/', (req, res) => createCourse(req, res));

router.get('/all', (req, res) => listCourse(req, res));

router.get('/now', function(req, res) {
    res.send('now pages');
});

export default router;