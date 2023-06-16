const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 }); // sort by the latest created

  res.status(200).json(workouts);
};

//get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  //check if id is a valid type, if not throw an error instead of crashing the server by default
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  //mongo retrieves the object by id
  const workout = await Workout.findById(id);

  //if no workout then return to stop the code from here instead of keep going
  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout); // return the object
};

// create new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = []
  
  if(!title){
    emptyFields.push('title')
  }
  if(!load){
    emptyFields.push('load')
  }
  if(!reps){
    emptyFields.push('reps')
  }
  if(emptyFields.length > 0){
    return res.status(400).json({error: 'Please fill in all fields', emptyFields})
  }

  //add doc to db
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  // get the id from the request
  const { id } = req.params;

  //check if id is a valid type, if not throw an error instead of crashing the server by default
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  //mongo finds and deletes the object by id
  const workout = await Workout.findOneAndDelete({ _id: id });

  //if no workout then return to stop the code from here instead of keep going
  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

// update a workout
const updateWorkout = async (req, res) => {
  // get the id from the request
  const { id } = req.params;

  //check if id is a valid type, if not throw an error instead of crashing the server by default
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  //mongo updates the object by id
  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body, //spread (or fill) the body of the request into this object
    }
  );

  //if no workout then return to stop the code from here instead of keep going
  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
};
