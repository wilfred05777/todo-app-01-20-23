// config/db.js
const mongoose = require("mongoose");
// const db = process.env.MONGO_URI;
mongoose.set("strictQuery", false);

const db = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    /// `mongoose.connect()...`  bug not connected to mongodb need to figure this out
    // await mongoose.connect(
    //   db,
    await mongoose.connect(
      `mongodb+srv://merntodoapp:merntodoapp@wilfredcluster.rsfdy.mongodb.net/merntodoapp23?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log("MongoDB is connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
