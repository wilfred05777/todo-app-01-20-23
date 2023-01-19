// config/db.js
const mongoose = require("mongoose");

const db = process.env.MONGO_URI;

// mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const conn = await `mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })`;
    console.log("MongoDB is connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
