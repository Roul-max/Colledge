import mongoose from "mongoose";

const subtaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 100,
    trim: true,
  },

  description: {
    type: String,
    maxLength: 500,
    trim: true,
    default: "",
  },

  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },

  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },

  category: {
    type: String,
    enum: ["work", "personal", "urgent", "uncategorized"],
    default: "uncategorized",
  },

  dueDate: {
    type: Date,
    default: null,
  },

  subtasks: {
    type: [subtaskSchema],
    default: [],
  },

  archived: {
    type: Boolean,
    default: false,
  },

  completedAt: {
    type: Date,
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Mongoose 8 compatible middleware
taskSchema.pre("save", function () {
  this.updatedAt = new Date();

  if (this.isModified("status")) {
    if (this.status === "completed" && !this.completedAt) {
      this.completedAt = new Date();
    } else if (this.status !== "completed") {
      this.completedAt = null;
    }
  }
});

const Task = mongoose.model("Task", taskSchema);

export default Task;