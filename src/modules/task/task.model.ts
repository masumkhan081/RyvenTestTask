import mongoose from "mongoose";
import { ITask } from "./task.type";
const taskSchema = new mongoose.Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      minLength: [3, "Task title must be at least 3 characters long"],
      maxLength: [100, "Task title cannot exceed 100 characters"],
    },
    shortDescription: {
      type: String,
      trim: true,
      maxLength: [200, "Short description cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Task description is required"],
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
      validate: [
        function (this: ITask, value: Date) {
          return this.startDate <= value;
        },
        "Due date must be after or the same as start date",
      ],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completionPercentage: {
      type: Number,
      default: 0,
      min: [0, "Completion percentage cannot be less than 0"],
      max: [100, "Completion percentage cannot be more than 100"],
    },
    rewardCoins: {
      type: Number,
      default: 0,
      min: [0, "Reward coins cannot be less than 0"],
    },
  },
  { timestamps: true, versionKey: false, toJSON: { virtuals: true } }
);

export default mongoose.model("Task", taskSchema);
