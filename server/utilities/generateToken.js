import jwt from "jsonwebtoken";

// Generate JWT with new user variable (can declare it with anything)
const generateToken = (keyId) => {
  const token = jwt.sign({ keyId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;

  // Generate JWT-cookie (comment-out because of deployment issues on Render.com)
  // response.cookie("jwt", token, {
  //   httpOnly: true,
    // Use secure cookies when in production mode
    // secure: process.env.NODE_ENV !== "development", 
    // None for cross-site when in production mode
    // Strict for same-site when in development mode
  //   sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict", 
  //   maxAge: 30 * 24 * 60 * 60 * 1000, // Expires in 30 days
  // });
};

export default generateToken;