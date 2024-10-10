import mongoose, { Document, Schema, Model } from "mongoose";


interface IQuestion extends Document {
  questionText: string;
  options: string[];
  correctAnswer: string;
  createdBy: mongoose.Types.ObjectId; 
}

const QuestionSchema: Schema<IQuestion> = new Schema(
  {
    questionText: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: [String],
      required: true,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Question: Model<IQuestion> = mongoose.model<IQuestion>("Question", QuestionSchema);
export { Question };
