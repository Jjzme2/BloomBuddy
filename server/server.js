import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";
import engine from "ejs-mate";
import globalMiddleware from "./middleware/global.js";
import { setTimer, sendNotification } from "./notifications/timer.js"; // Import timer notification module

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(globalMiddleware);

import mainRoutes from "./routes/main.js";
app.use("/", mainRoutes);

// Set a timer for developers using the timer notification module
setTimer(3600000, () => {
  sendNotification("developer@example.com", "Take a Break", "You've been coding for an hour. Time to take a break!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
