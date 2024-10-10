"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
// Function to hash a password
const hashPassword = async (password) => {
    try {
        const saltround = 10;
        const hashedPassword = await bcrypt_1.default.hash(password, saltround);
        return hashedPassword;
    }
    catch (error) {
        console.error("Error hashing password:", error);
        return undefined;
    }
};
exports.hashPassword = hashPassword;
const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt_1.default.compare(password, hashedPassword);
    }
    catch (error) {
        console.error("Error comparing passwords:", error);
        return false;
    }
};
exports.comparePassword = comparePassword;
