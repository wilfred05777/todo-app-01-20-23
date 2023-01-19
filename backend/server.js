/// server.js
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

require("dotenv").config({ path: "/.config.env" });

const app = express();

app.use(cors());
app.use(express.json());

/// connect database
connectDB(); /// added

/// initialize middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send(`Server up and running `));

/// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
