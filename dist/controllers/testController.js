"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveDeletedTestController = exports.permanentDeleteTestController = exports.softDeleteTestController = exports.updateTestController = exports.getTestByIdController = exports.getTestsController = exports.createTestController = void 0;
const Test_1 = require("../models/Test");
const createTestController = async (req, res) => {
    try {
        const { name, questions } = req.body;
        const createdBy = req.user._id;
        const newTest = new Test_1.Test({
            name,
            questions,
            createdBy,
        });
        await newTest.save();
        res.status(201).json({
            success: true,
            message: "Test created successfully",
            test: newTest,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating test",
        });
    }
};
exports.createTestController = createTestController;
const getTestsController = async (req, res) => {
    try {
        const tests = await Test_1.Test.find({ isDeleted: false });
        return res.status(200).json({
            success: true,
            message: "Test fetched successfully",
            tests,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error retrieving tests",
        });
    }
};
exports.getTestsController = getTestsController;
const getTestByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const test = await Test_1.Test.findOne({ _id: id, isDeleted: false }).populate("questions").lean();
        if (!test) {
            return res.status(404).json({
                success: false,
                message: "Test not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Test fetched successfully",
            data: test,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error retrieving test",
        });
    }
};
exports.getTestByIdController = getTestByIdController;
const updateTestController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, questions } = req.body;
        const updatedTest = await Test_1.Test.findOneAndUpdate({ _id: id, isDeleted: false }, { name, questions }, { new: true });
        if (!updatedTest) {
            return res.status(404).json({
                success: false,
                message: "Test not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Test updated successfully",
            data: updatedTest,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating test",
        });
    }
};
exports.updateTestController = updateTestController;
const softDeleteTestController = async (req, res) => {
    try {
        const { id } = req.params;
        const test = await Test_1.Test.findById(id);
        if (!test) {
            return res.status(404).json({
                success: false,
                message: 'Test not found',
            });
        }
        test.isDeleted = true;
        await test.save();
        return res.status(200).json({
            success: true,
            message: 'Test deleted successfully',
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error deleting test',
        });
    }
};
exports.softDeleteTestController = softDeleteTestController;
const permanentDeleteTestController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTest = await Test_1.Test.findByIdAndDelete(id);
        if (!deletedTest) {
            return res.status(404).json({
                success: false,
                message: 'Test not found',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Test permanently deleted',
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error permanently deleting test',
        });
    }
};
exports.permanentDeleteTestController = permanentDeleteTestController;
const retrieveDeletedTestController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTest = await Test_1.Test.findOne({ _id: id, isDeleted: true });
        if (!deletedTest) {
            return res.status(404).json({
                success: false,
                message: 'Deleted test not found',
            });
        }
        deletedTest.isDeleted = false;
        await deletedTest.save();
        return res.status(200).json({
            success: true,
            message: 'Test successfully restored',
            test: deletedTest,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error restoring deleted test',
        });
    }
};
exports.retrieveDeletedTestController = retrieveDeletedTestController;
