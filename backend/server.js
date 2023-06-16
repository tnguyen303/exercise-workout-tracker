// invoke package to use
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");

// express app
const app = express();

// MIDDLEWARE

// this is required so we can use req.body when calling api
app.use(express.json());

// console.log every request for debugging, "next" is needed so the next middleware can be run.
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// get and use all routes from routes/workouts, also specify to add /api/workouts to url to use
app.use("/api/workouts", workoutRoutes);

// connect to db, mongodb returns a promise which is asynchronous, so when it's finished "then" console.log, if error then shows
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
