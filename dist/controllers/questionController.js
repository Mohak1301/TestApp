"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuestionController = exports.getAllQuestionsController = exports.updateQuestionController = exports.createQuestionController = void 0;
const Question_1 = require("../models/Question");
const createQuestionController = async (req, res) => {
    try {
        const { questionText, options, correctAnswer } = req.body;
        const createdBy = req.user._id;
        const newQuestion = new Question_1.Question({
            questionText,
            options,
            correctAnswer,
            createdBy,
        });
        await newQuestion.save();
        res.status(201).json({
            success: true,
            message: "Question created successfully",
            question: newQuestion,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating question",
        });
    }
};
exports.createQuestionController = createQuestionController;
const updateQuestionController = async (req, res) => {
    try {
        const { id } = req.params;
        const { questionText, options, correctAnswer } = req.body;
        const updatedQuestion = await Question_1.Question.findByIdAndUpdate(id, { questionText, options, correctAnswer }, { new: true });
        if (!updatedQuestion) {
            res.status(404).json({
                success: false,
                message: "Question not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Question updated successfully",
            question: updatedQuestion,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating question",
        });
    }
};
exports.updateQuestionController = updateQuestionController;
const getAllQuestionsController = async (req, res) => {
    try {
        const questions = await Question_1.Question.find().select('-correctAnswer');
        return res.status(200).json({
            success: true,
            message: "Questions fetched successfully",
            questions,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error retrieving questions",
        });
    }
};
exports.getAllQuestionsController = getAllQuestionsController;
const deleteQuestionController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedQuestion = await Question_1.Question.findByIdAndDelete(id);
        if (!deletedQuestion) {
            return res.status(404).json({
                success: false,
                message: "Question not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Question deleted successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting question",
        });
    }
};
exports.deleteQuestionController = deleteQuestionController;
