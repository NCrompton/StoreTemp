"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.updateCourse = exports.createCourse = exports.getCourseById = exports.getCourse = void 0;
const init_models_1 = require("../models/init-models");
function getCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const status = "OK";
        const data = yield init_models_1.model.course.findAll({ attributes: ["code"] });
        return res.json({ status, data });
    });
}
exports.getCourse = getCourse;
function getCourseById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const course_id = req.params.id === "?" || "";
        let status = "400";
        let error = "Invalid parameters";
        if (checkIDType(req.params)) {
            const whereState = createWhereStatement(req.params);
            let data = [];
            yield init_models_1.model.course
                .findAll({
                attributes: ["course_id", "code", "dept", "website"],
                where: whereState,
            })
                .then((result) => {
                status = result.length > 0 ? "200" : "204";
                data = result;
                error = result.length === 0 ? "Cannot find any data" : "";
                /* status = "200"
                data = result*/
            })
                .catch((err) => {
                status = "400";
                error = err;
            });
            return status === "200"
                ? res.json({ status, data })
                : res.json({ status, error, data });
        }
        return res.json({ status, error });
    });
}
exports.getCourseById = getCourseById;
function createCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        // console.log(data)
        const newCourse = yield init_models_1.model.course.create(data).catch((err) => {
            return res.json({ status: "error", error: err });
        });
        return res.json({ status: "201", data: newCourse });
    });
}
exports.createCourse = createCourse;
function updateCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        console.log(data);
        const whereState = createWhereStatement(req.params);
        const courses = yield init_models_1.model.course.findAll({
            where: whereState,
        });
        if (courses.length > 1) {
            return res.json({ status: "error", error: "Too many entry fit the params" });
        }
        const course = courses[0];
        course.set(data);
        course.save();
        return res.json({ status: "OK", data: course });
    });
}
exports.updateCourse = updateCourse;
function deleteCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const whereState = createWhereStatement(req.params);
        const courses = yield init_models_1.model.course.findAll({
            where: whereState,
        });
        if (courses.length > 1) {
            return res.json({ status: "error", error: "Too many entry fit the params" });
        }
        const course = courses[0];
        yield course.update({ website: "inactive" });
        return res.json({ status: "OK", data: course });
    });
}
exports.deleteCourse = deleteCourse;
function createWhereStatement(params) {
    const wherestate = {};
    params.id === "!" || Object.assign(wherestate, { course_id: params.id });
    params.code === "!" ||
        params.code === undefined ||
        Object.assign(wherestate, { code: params.code });
    params.dept === "!" ||
        params.dept === undefined ||
        Object.assign(wherestate, { dept: params.dept });
    return wherestate;
}
function checkIDType({ id }) {
    if (!Number.isNaN(Number(id)) || id === "!") {
        return true;
    }
    return false;
}
//# sourceMappingURL=course.js.map