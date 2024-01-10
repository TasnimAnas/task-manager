const express = require("express");
const tasks = require("./routers/tasks");
const connectDB = require("./database/connect");
const { errorHandler } = require("./utils/error");
const notFoundHandler = require("./utils/notFoundHandler");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/v1/tasks", tasks);
app.use(notFoundHandler);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log("listening on port", PORT);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
