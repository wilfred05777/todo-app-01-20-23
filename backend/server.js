/**
 * server.js
 */
// ==============================

require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

// dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors());
app.use(express.json());

/// routes
const todo = require("./routes/todo"); /// added

/// connect database
connectDB(); /// added

/// cors
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

/// initialize middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send(`Server up and running `));

/// use routes
app.use("/api/todo", todo); /// added

/// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
