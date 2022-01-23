import { model, Schema, Document } from "mongoose";
interface todo extends Document {
  title: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}
const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Todo = model<todo>("Todo", todoSchema);
