"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testController_1 = require("../controllers/testController");
const resolveMiddleware_1 = require("../middleware/resolveMiddleware");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/create-test', (0, resolveMiddleware_1.asyncMiddleware)(authMiddleware_1.requireSignIn), (0, resolveMiddleware_1.asyncMiddleware)(testController_1.createTestController));
router.get('/get-test', (0, resolveMiddleware_1.asyncMiddleware)(authMiddleware_1.requireSignIn), (0, resolveMiddleware_1.asyncMiddleware)(testController_1.getTestsController));
router.get('/get-testById/:id', (0, resolveMiddleware_1.asyncMiddleware)(authMiddleware_1.requireSignIn), (0, resolveMiddleware_1.asyncMiddleware)(testController_1.getTestByIdController));
router.patch('/update-test/:id', (0, resolveMiddleware_1.asyncMiddleware)(authMiddleware_1.requireSignIn), (0, resolveMiddleware_1.asyncMiddleware)(testController_1.updateTestController));
router.delete('/softDelete-test/:id', (0, resolveMiddleware_1.asyncMiddleware)(authMiddleware_1.requireSignIn), (0, resolveMiddleware_1.asyncMiddleware)(testController_1.softDeleteTestController));
router.delete('/permanentDelete-test/:id', (0, resolveMiddleware_1.asyncMiddleware)(authMiddleware_1.requireSignIn), (0, resolveMiddleware_1.asyncMiddleware)(testController_1.permanentDeleteTestController));
router.patch('/retrieve-test/:id', (0, resolveMiddleware_1.asyncMiddleware)(authMiddleware_1.requireSignIn), (0, resolveMiddleware_1.asyncMiddleware)(testController_1.retrieveDeletedTestController));
exports.default = router;
