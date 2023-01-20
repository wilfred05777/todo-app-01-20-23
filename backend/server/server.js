const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./backend/server/config.env" });

const connectDB = require("../server/db/conn");

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("../routes/record"));
// get driver connection
const dbo = require("./db/conn");

/// routes
const todo = require("../routes/todo");
const { application } = require("express");
const { getDb } = require("../server/db/conn");

/// use routes
app.use("/api/todo", todo); // <-- added
/// connect database
// connectDB();
getDb();

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
