import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";
import engine from "ejs-mate";
import globalMiddleware from "./middleware/global.js";
// ! These seem to work, using the example below: These should be moved to a scheduling system though.
// import {
//   createNotification,
//   sendDeveloperEmail,
// } from "./services/.notifications/NotificationService.js";

/*
// ! Example of how to use the NotificationService
  const testNotif = createNotification("Server is running", { port: port });
  sendDeveloperEmail(testNotif);
*/

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
