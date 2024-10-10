"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.registerController = void 0;
const User_1 = require("../models/User");
const authHelper_1 = require("../helper/authHelper");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerController = async (req, res) => {
    try {
        const { username, name, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "Please provide all the details" });
        }
        const existingUser = await User_1.User.findOne({
            $or: [{ email }, { username }],
        });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: existingUser.email === email
                    ? "User with this email already exists"
                    : "Username already exists",
            });
        }
        const hashedPassword = await (0, authHelper_1.hashPassword)(password);
        const newUser = new User_1.User({
            name,
            email,
            username,
            password: hashedPassword,
        });
        await newUser.save();
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser._id.toString(),
                name: newUser.name,
                email: newUser.email,
                username: newUser.username,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in register API",
        });
    }
};
exports.registerController = registerController;
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }
        if (!password) {
            return res.status(400).json({ success: false, message: "Password is required" });
        }
        const user = await User_1.User.findOne({ email }).exec();
        if (!user) {
            return res.status(404).json({ success: false, message: "No user found" });
        }
        const isPasswordValid = await (0, authHelper_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                username: user.username,
                name: user.name,
                email: user.email,
            },
            token,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Failed to login" });
    }
};
exports.loginController = loginController;
