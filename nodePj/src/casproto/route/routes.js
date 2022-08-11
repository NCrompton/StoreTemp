import express from "express";
import course from "./courseroutes.js"; 
import coursedetail from "./coursedetailroutes.js";

var router = express.Router();

router.get('/', function(req, res){
    res.send("main page")
})

router.use('/course', course);

router.use('/coursedetail', coursedetail);

export default router;