import express from "express"
import {config} from"dotenv";
import {connectToMongo} from"./config/db.js";
import UserRoute from "./routes/userRoute.js";
import bookRoute from "./routes/bookRoute.js";
import LibraryPassRoute from "./routes/libraryPassRoute.js";
import BookIssueRoute from "./routes/bookIssueRoute.js"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
config({path:"./config/config.env"});
const app=express();
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use("/api/v1",UserRoute);
app.use("/api/v1/book",bookRoute);
app.use("/api/v1",LibraryPassRoute);
app.use("/api/v1",BookIssueRoute);

  app.listen(process.env.PORT, () => {
    connectToMongo();
    console.log(`Server is Working on http://localhost:${process.env.PORT}`);
  });
