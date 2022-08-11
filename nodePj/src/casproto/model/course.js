import {retrieveData, buildSqlCondition, buildSqlCreate} from './db.js'
import {formatJson} from '../util/formatter.js'

const parameters = {"table": "Course","col": {"code": "str", "course_id": "int", "dept": "str"}}

export function findCourse(req, res){
    let sql = buildSqlCondition(req.query, parameters);
    console.dir(req.query);
    
    retrieveData(sql).then(r => {
        res.set('Content-Type', 'application/json');
        res.set("Access-Control-Allow-Origin", "*");
        res.json(formatJson(r))
    });
}

export const listCourse = function(){
    const sql = "select * from Course"
    retrieveData(sql).then(r => res.send(formatJson(r)));
}

export function createCourse(req, res){
    //let sql = buildSqlCreate();
    const sql = "Insert into prog_staff (programme_id, staff_sso_id) values (68, \'dev\')"
    retrieveData(sql).then(r => res.send(r))
}
