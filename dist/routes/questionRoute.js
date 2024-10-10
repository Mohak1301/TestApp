"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const questionController_1 = require("../controllers/questionController");
const resolveMiddleware_1 = require("../middleware/resolveMiddleware");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/create-question', (0, resolveMiddleware_1.asyncMiddleware)(authMiddleware_1.requireSignIn), (0, resolveMiddleware_1.asyncMiddleware)(questionController_1.createQuestionController));
router.get('/get-question', (0, resolveMiddleware_1.asyncMiddleware)(authMiddleware_1.requireSignIn), (0, resolveMiddleware_1.asyncMiddleware)(questionController_1.getAllQuestionsController));
exports.default = router;