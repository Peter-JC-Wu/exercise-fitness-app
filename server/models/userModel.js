import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

let Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String, 
    unique: true,
    required: [true, "Username required"],
  },
  email: {
    type: String, 
    unique: true,
    required: [true, "Email required"],
    validate: [validator.isEmail, "Valid email required"],
  },
  password: {
    type: String,
    required: [true, "Password required"],
  },
  fitnessGoal: {
    type: String,
    description: "User's fitness goal(s)",
  },
  savedFavoriteExercisesList: [{ 
    exercise: {
      type: Schema.Types.ObjectId, 
      ref: "savedFavoriteExercisesList",
    },
    exerciseId: {
      type: String,
      unique: true,
    },
  }],
  workoutList: [{ 
    type: Schema.Types.ObjectId, ref: "workoutList" 
  }],
  completedWorkoutList: [{ 
    type: Schema.Types.ObjectId, ref: "completedWorkoutList" 
  }],
}, { timestamps: true });

// Encrypt password using bcryptjs middleware to hash password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Check user credentials to match entered password to encrypted hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);

export default User;