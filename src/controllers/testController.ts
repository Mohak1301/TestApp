import { Request, Response } from "express";
import { Test } from "../models/Test";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import mongoose, { mongo, Mongoose } from "mongoose";

interface ValidatTest{
  name : string,
  questions: mongoose.Types.ObjectId[];
}
interface Dummy{
    success : boolean,
    message : string,
}

export const createTestController = async (req: AuthenticatedRequest,res: Response): Promise<void> => {
  try {
    const { name, questions }  : ValidatTest = req.body;
    const createdBy = req.user._id;

    const newTest = new Test({
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating test",
    });
  }
};


export const getTestsController = async (req: Request, res: Response): Promise<Response<Dummy>> => {
    try {
      
      const tests = await Test.find({ isDeleted: false }); 
  
      return res.status(200).json({
        success: true,
        message:"Test fetched successfully",
        tests,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error retrieving tests",
      });
    }
  };
  

  export const getTestByIdController = async (
    req: Request<{ id: mongoose.Types.ObjectId }>,
    res: Response
  ): Promise<Response<Dummy>> => {
    try {
      const { id } = req.params;
  
      const test = await Test.findOne({ _id: id, isDeleted: false }).populate("questions").lean();
  
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
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error retrieving test",
      });
    }
  };

  export const updateTestController = async (req: Request<{ id: mongoose.Types.ObjectId }>,res: Response): Promise<Response<Dummy>> => {
    try {
      const { id } = req.params;
      const { name, questions } : ValidatTest = req.body;
  
      const updatedTest  = await Test.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { name, questions  },
        { new: true }
      );
  
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
    } catch (error) {
    return res.status(500).json({
        success: false,
        message: "Error updating test",
      });
    }
  };

  export const softDeleteTestController = async (
    req: Request<{id: mongoose.Types.ObjectId}>,
    res: Response
  ): Promise<Response<Dummy>> => {
    try {
      const { id } = req.params;
    
      const test = await Test.findById(id);
  
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
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error deleting test',
      });
    }
  };



  export const permanentDeleteTestController = async (
    req:  Request<{id: mongoose.Types.ObjectId}>,
    res: Response
  ): Promise<Response<Dummy>> => {
    try {
      const { id } = req.params;
  
      const deletedTest = await Test.findByIdAndDelete(id);
  
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
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error permanently deleting test',
      });
    }
  };


  export const retrieveDeletedTestController = async (
    req: Request<{id : mongoose.Types.ObjectId}>,
    res: Response
  ): Promise<Response<Dummy>> => {
    try {
      const { id } = req.params;
  
      const deletedTest = await Test.findOne({ _id: id, isDeleted: true });
  
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
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error restoring deleted test',
      });
    }
  };