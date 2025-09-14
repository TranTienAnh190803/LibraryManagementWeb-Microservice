import "dotenv/config";
import express from "express";
import { connectMongoDB } from "./Config/ConnectDB.js";

const port = process.env.PORT;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  connectMongoDB();
  console.log(`http://localhost:${port}`);
});
