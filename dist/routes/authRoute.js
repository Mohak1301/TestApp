"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const resolveMiddleware_1 = require("../middleware/resolveMiddleware");
const router = (0, express_1.Router)();
router.post('/register', (0, resolveMiddleware_1.asyncMiddleware)(authController_1.registerController));
router.post('/login', (0, resolveMiddleware_1.asyncMiddleware)(authController_1.loginController));
exports.default = router;
