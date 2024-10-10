import mongoose, { Document, Schema, Model } from "mongoose";

interface IAnswer extends Document {
  user: mongoose.Types.ObjectId;
  test: mongoose.Types.ObjectId;
  question: mongoose.Types.ObjectId;
  selectedOption: string;
}

const AnswerSchema: Schema<IAnswer> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    selectedOption: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Answer: Model<IAnswer> = mongoose.model<IAnswer>("Answer", AnswerSchema);
export { Answer };
