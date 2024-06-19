const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const indexRoutes = require("./src/routes/index");

const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

// Load environment variables from the .env file
dotenv.config({ path: path.resolve(__dirname, "./.env") });

// Get port and MongoDB URI from environment variables
const port = process.env.PORT;
const mongoUri = process.env.MONGODB_URI;

if (!port) {
  console.error("PORT is not defined in the environment variables.");
  process.exit(1);
}

if (!mongoUri) {
  console.error("MONGODB_URI is not defined in the environment variables.");
  process.exit(1);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.get("/", (req, res) => {
  res.send("You're Connected Successfully!");
});

// User routing
app.use("/api/v1", indexRoutes);


app.listen(port, () => {
  console.log(`OdoTracker listening on port ${port}!`);
  
});
