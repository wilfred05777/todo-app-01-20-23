/// models/todo.js
const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: {
    type: "String"
  },
  description: {
    type: "String"
  }
});

const Todo = mongoose.model("todo", TodoSchema);

module.exports = Todo;
