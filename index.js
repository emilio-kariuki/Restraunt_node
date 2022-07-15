import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routes from "./Routes/restraunts.js";
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const connection = mongoose.connection;

connection.on("open", () => {
  console.log("connected to mongo");
});
connection.error("error", () => {
  console.log("error connecting to mongo");
});

app.use('/restraunt', routes);

app.get("/", (req, res) => {
  res.send("The page is working fine");
});
app.get("*", (req, res) => {
  res.send("The page called does not exist");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
