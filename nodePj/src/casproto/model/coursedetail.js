import { buildSqlCondition, retrieveData } from "./db.js";
import { formatJson } from '../util/formatter.js'

const parameters = {"table": "course_detail", "col": {"course_detail_id": "int", "course_id": "int", "name": "str", "credit": "int", "level": "str"}, "fk": {"course_detail.course_id": "course.course_id"}};

export function findCourseDetail(req, res){
    let sql = buildSqlCondition(req.query, parameters);
    console.log(sql);
    retrieveData(sql).then(r => res.send(formatJson(r))); 
}

export function listAllCourse(req, res){
    const sql = "select * from Course_Detail"
    retrieveData(sql).then(r => res.send(formatJson(r)));
}