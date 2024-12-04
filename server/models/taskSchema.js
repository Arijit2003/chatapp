const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  active: { type: Boolean, required: true },
  newTask: { type: Boolean, required: true },
  completed: { type: Boolean, required: true },
  failed: { type: Boolean, required: true },
  taskTitle: { type: String, required: true },
  taskDescription: { type: String, required: true },
  taskDate: { type: Date, required: true },
  category: { type: String, required: true },
});

const employeeSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  usertype: { type: String, required: true}, // Example roles
  userId: { type: mongoose.Schema.Types.ObjectId,ref: "users",required: true, }, // Reference to another collection
  taskCounts: {
    active: { type: Number, default: 0 },
    newTask: { type: Number, default: 0 },
    completed: { type: Number, default: 0 },
    failed: { type: Number, default: 0 },
  },
  tasks: [taskSchema], // Array of tasks
});

const Task = mongoose.model("Task", employeeSchema);

module.exports = Task;
