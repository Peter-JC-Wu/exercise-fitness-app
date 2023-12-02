import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import connectMongoDB from "./config/mongoDB.js";
import userRoutes from "./routes/userRoutes.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";

// MongoDB setup
connectMongoDB();

const app = express();

// Server setup
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server started and is listening on port: ${port}`));

// Enable CORS
app.use(cors({
  origin: ["https://exercise-fitness-app-client.onrender.com", "https://exercise-fitness-app-client-670cdynj0-peter-wu-projects.vercel.app"],
  credentials: true,
}));

// Add middleware to access body data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add middleware to parse the cookie
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/users", exerciseRoutes);

// If in production mode 
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "..", "client", "build")));

  app.get("*", (request, response) => response.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html")));
} else {
  // If not in production mode
  app.get("/", (request, response) => response.send("Server is ready"));
};

// Custom error middleware handler
app.use(notFound);
app.use(errorHandler);
