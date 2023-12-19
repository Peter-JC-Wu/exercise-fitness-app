import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CompletedWorkoutsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  workouts: [{
    type: Schema.Types.ObjectId, ref: "workoutList"
  }],
  user: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true, 
  },
}, { timestamps: true });

const completedWorkoutList = mongoose.model("completedWorkoutList", CompletedWorkoutsSchema);

export default completedWorkoutList;