import mongoose from "mongoose";
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  sets: {
    type: String,
    required: true,
  },
  reps: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  exercise: [{
    type: Schema.Types.ObjectId, ref: "savedFavoriteExercisesList" 
  }],
  user: { 
    type: Schema.Types.ObjectId, 
    ref: "User",
    required: true, 
  },
}, { timestamps: true });

const workoutList = mongoose.model("workoutList", WorkoutSchema);

export default workoutList;