const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
); //add timestamp of creation or last updated

module.exports = mongoose.model('Workout', workoutSchema) // defind "Workout" model to interact with "Workouts" collection, mongoose automaticall creates a collection named "Workouts"

