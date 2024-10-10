import mongoose, { Document, Schema, Model } from "mongoose";

interface ITest extends Document {
  name: string;
  questions: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
  isDeleted?: boolean; // Add this field for soft delete
}

const TestSchema: Schema<ITest> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isDeleted: {  // Field for soft delete
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);



const Test: Model<ITest> = mongoose.model<ITest>("Test", TestSchema);
export { Test };
