const express = require("express");
// get all controllers for workout methods
const {createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout} = require('../controllers/workoutController')

const router = express.Router();

// get all workouts
router.get("/", getWorkouts);

// get a workout by id
router.get("/:id", getWorkout);

// add a workout
router.post("/", createWorkout);

// delete a workout
router.delete("/:id", deleteWorkout);

// update a workout
router.patch("/:id", updateWorkout);

module.exports = router;
