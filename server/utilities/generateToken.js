import jwt from "jsonwebtoken";

// Generate JWT with new user variable (can declare it with anything)
const generateToken = (response, keyId) => {
  const token = jwt.sign({ keyId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  console.log("Generated Token:", token);

  // Generate JWT-cookie
  response.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies when in production mode
    sameSite: "None",
    maxAge: 30 * 24 * 60 * 60 * 1000, // Expires in 30 days
  });
};

export default generateToken;