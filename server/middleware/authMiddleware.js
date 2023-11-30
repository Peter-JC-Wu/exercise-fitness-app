import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protectRoute = asyncHandler(async (request, response, next) => {
  let token;
  console.log(request.cookies, "protectRoute request cookies");
  console.log(request.cookies.jwt, "protectRoute request cookies jwt");
  // Using cookieParser middleware
  token = request.cookies.jwt; 

  if (token) {
    try {
      // Verify token information
      // decoded will be an object with the id. The id is in the token.
     const decoded = jwt.verify(token, process.env.JWT_SECRET);

     // Get user information from generated token
     // decoded.keyId must match same variable in generateToken.js
     // select("-password") will exclude the password from the response.
     request.user = await User.findById(decoded.keyId).select("-password");

     next();
    } catch (error) {
      // Have token, but incorrect
      response.status(401);
      throw new Error("Not authorized, invalid token!");
    }
  } else {
    // If no token
    response.status(401);
    throw new Error("Not authorized, no token!");
  }
});

export { protectRoute };