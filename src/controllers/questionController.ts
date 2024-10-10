import { Request, Response } from "express";
import { Question } from "../models/Question";
import { AuthenticatedRequest } from "../middleware/authMiddleware";


interface UpdateQuestionRequestBody {
  questionText?: string;
  options?: string[];
  correctAnswer?: string;
}

interface GetQuestionResponseBody{
    success: boolean;
    message: string;
    question?: {
      id: string;
      name: string;
      email: string;
      username: string;
    };
}

interface ValidateQuestion{
    questionText : string,
    options : [string],
    correctAnswer : string
}

export const createQuestionController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { questionText, options, correctAnswer } : ValidateQuestion = req.body;
    const createdBy = req.user._id;

    const newQuestion = new Question({
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating question",
    });
  }
};

export const updateQuestionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { questionText, options, correctAnswer } : UpdateQuestionRequestBody= req.body;

    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { questionText, options, correctAnswer },
      { new: true }
    );

    if (!updatedQuestion) {
       res.status(404).json({
        success: false,
        message: "Question not found",
      });
      return ;
    }

    res.status(200).json({
      success: true,
      message: "Question updated successfully",
      question: updatedQuestion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating question",
    });
  }
};

export const getAllQuestionsController = async (
    req: Request,
    res: Response
  ): Promise<Response<GetQuestionResponseBody>> => {
    try {
      const questions = await Question.find().select('-correctAnswer'); 
  
     return  res.status(200).json({
        success: true,
        message: "Questions fetched successfully",
        questions,
      });
    } catch (error) {
     return  res.status(500).json({
        success: false,
        message: "Error retrieving questions",
      });
    }
  };
  



export const deleteQuestionController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<Response<GetQuestionResponseBody>> => {
  try {
    const { id } = req.params;

    const deletedQuestion = await Question.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

   return  res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting question",
    });
  }
};


