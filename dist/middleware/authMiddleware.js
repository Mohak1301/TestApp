"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireSignIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ success: false, message: 'Authorization token is required' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log('Error in requireSignIn middleware:', error);
        res.status(403).json({ success: false, message: 'Invalid token' });
    }
};
exports.requireSignIn = requireSignIn;
