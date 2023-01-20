// config/db.js
const mongoose = require("mongoose");

const db = process.env.MONGO_URI;

// mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    // `mongoose.connect()...`  bug not connected to mongodb need to figure this out
    const conn = await `{mongoose.connect(db, {
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
