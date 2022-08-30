"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_1 = __importDefault(require("dotenv/config"));
const course_1 = require("../controller/course");
config_1.default;
const router = (0, express_1.Router)();
router.get("", (req, res) => (0, course_1.getCourse)(req, res));
router.get("/:id/", (req, res) => (0, course_1.getCourseById)(req, res));
router.get("/:id/:code/", (req, res) => (0, course_1.getCourseById)(req, res));
router.get("/:id/:code/:dept", (req, res) => (0, course_1.getCourseById)(req, res));
router.post("/", (req, res) => (0, course_1.createCourse)(req, res));
router.put("/:id", (req, res) => (0, course_1.updateCourse)(req, res));
router.put("/:id/:code", (req, res) => (0, course_1.updateCourse)(req, res));
router.put("/:id/:code/:dept", (req, res) => (0, course_1.updateCourse)(req, res));
router.delete("/:id", (req, res) => (0, course_1.deleteCourse)(req, res));
router.delete("/:id/:code", (req, res) => (0, course_1.deleteCourse)(req, res));
router.delete("/:id/:code/:dept", (req, res) => (0, course_1.deleteCourse)(req, res));
exports.default = router;
//# sourceMappingURL=courserouter.js.map