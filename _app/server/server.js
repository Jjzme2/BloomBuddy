// Import necessary modules
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
// import jwt from 'jsonwebtoken';
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";
import engine from "ejs-mate"; // Import EJS-Mate
import globalMiddleware from "./middleware/global.js";

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app = express();

// Define the port to run the server on
const port = process.env.PORT || 3000;

// Resolve __dirname since ES modules don't have it by default
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the assets directory
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Use EJS-Mate as the rendering engine
app.engine("ejs", engine); // Register EJS-Mate as the engine for EJS files
app.set("view engine", "ejs"); // Set EJS as the view engine
app.set("views", path.join(__dirname, "views")); // Set the views directory

// Serve static files from the Vue/Vite app // ! ( Uncomment if needed)
// app.use(express.static(path.join(__dirname, "../client/dist")));

// Middleware to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport middleware for authentication
app.use(passport.initialize());

// Add Global Middleware for EJS templates
app.use(globalMiddleware);

// Add routes to the application
import mainRoutes from "./routes/main.js";
app.use("/", mainRoutes);

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
