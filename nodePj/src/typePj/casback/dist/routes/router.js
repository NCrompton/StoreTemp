"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courserouter_1 = __importDefault(require("./courserouter"));
const router = (0, express_1.Router)();
router.use("/course", courserouter_1.default);
router.get("/", (req, res) => {
    res.send("rogered!");
});
exports.default = router;
//# sourceMappingURL=router.js.map