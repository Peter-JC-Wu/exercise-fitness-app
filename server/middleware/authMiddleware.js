import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protectRoute = asyncHandler(async (request, response, next) => {
  let token;
  // Extract token from Authorization header
  const authorizationHeader = request.headers.authorization;
  
  if (authorizationHeader && authorizationHeader.startsWith("Bearer")) {
    try {
      // Extract token from Authorization header
      token = authorizationHeader.split(" ")[1];

      // Verify token information
      // decoded will be an object with the id. The id is in the token.
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if the token is expired
      if (decoded.exp < Date.now() / 1000) {
        response.status(401);
        throw new Error("Not authorized, token has expired!");
      }

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