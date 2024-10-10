"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncMiddleware = void 0;
const asyncMiddleware = (func) => (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch(err => next(err));
};
exports.asyncMiddleware = asyncMiddleware;
