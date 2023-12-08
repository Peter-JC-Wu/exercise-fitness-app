import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utilities/generateToken.js";

// @description   Authenticate user and set token
// @route         POST /api/users/auth
// @access        Public - can access URL without logging in
const authUser = asyncHandler(async (request, response) => {
  const { name, email, password } = request.body;
  
  // Check for user credentials with logic in userModel
  // Log in with either name and/or email with correct password
  const user = await User.findOne({$or: [{ name }, { email }]});

  if(user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);

    response.status(201).json({
      userId: user._id,
      name: user.name,
      email: user.email,
      fitnessGoal: user.fitnessGoal,
      savedFavoriteExercisesList: user.savedFavoriteExercisesList,
      workoutList: user.workoutList,
      completedWorkoutList: user.completedWorkoutList,
      token,
    });
  } else {
    response.status(401);
    throw new Error("Unauthorized Access: User not found or invalid credentials.");
  }
});

// @description   Register a new user
// @route         POST /api/users
// @access        Public - can access URL without logging in
const registerUser = asyncHandler(async (request, response) => {
  const { name, email, password, fitnessGoal } = request.body;

  if( !name || !email || !password || !fitnessGoal ) {
    response.status(400);
    throw new Error("Please enter all required information.");
  }

  // Check if user exists
  const usernameExists = await User.findOne({ name });
  const userEmailExists = await User.findOne({ email });

  if(usernameExists || userEmailExists) {
    response.status(400);
    throw new Error("Username and / or Email already registered.");
  }

  // Create a new user 
  const user = await User.create({
    name,
    email,
    password,
    fitnessGoal,
  });

  // Generate JWT-cookie along with response
  if(user) {
    const token = generateToken(user._id);

    response.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      fitnessGoal: user.fitnessGoal,
      savedFavoriteExercisesList: user.savedFavoriteExercisesList,
      workoutList: user.workoutList,
      completedWorkoutList: user.completedWorkoutList,
      token,
    });
  } else {
    response.status(401);
    throw new Error("Unauthorized Access: User not found or invalid credentials.");
  }
}); 

// @description   Logout user and clear JWT-cookie from local storage
// @route         POST /api/users/logout
// @access        Public - can access URL without logging in
const logoutUser = asyncHandler(async (request, response) => {  
  // response.cookie('jwt', '', {
  //   httpOnly: true,
  //   expires: new Date(0),
  // })

  response.status(200).json({ message: "User logged out successfully" });
}); 

// @description   Get user profile
// @route         GET /api/users/profile
// @access        Private - can access URL only with token after logging in
const getUserProfile = asyncHandler(async (request, response) => {
  
  const user = await User.findById(request.user._id);
  
  if (user) {
    response.status(200).json({
      _id: request.user._id,
      name: request.user.name,
      email: request.user.email,
      fitnessGoal: request.user.fitnessGoal,
      savedFavoriteExercisesList: request.user.savedFavoriteExercisesList,
      workoutList: request.user.workoutList,
      completedWorkoutList: request.user.completedWorkoutList,
    });
  } else {
    response.status(404);
    throw new Error("User not found");
  }
}); 

// @description   Update user profile
// @route         PUT /api/users/profile
// @access        Private - can access URL only with token after logging in
const updateUserProfile = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user._id);

  if (user) {
    user.name = request.body.name || user.name;
    user.email = request.body.email || user.email;
    user.fitnessGoal = request.body.fitnessGoal || user.fitnessGoal;

    if (request.body.password) {
      user.password = request.body.password;
    }

    const updatedUser = await user.save();

    response.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      fitnessGoal: updatedUser.fitnessGoal,
      savedFavoriteExercisesList: updatedUser.savedFavoriteExercisesList,
      workoutList: updatedUser.workoutList,
      completedWorkoutList: updatedUser.completedWorkoutList,
    });
  } else {
    response.status(404);
    throw new Error("User not found");
  }
});

export { 
  authUser, 
  registerUser, 
  logoutUser, 
  getUserProfile, 
  updateUserProfile,
};