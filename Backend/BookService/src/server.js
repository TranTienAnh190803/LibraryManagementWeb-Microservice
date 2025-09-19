import "dotenv/config";
import express from "express";
import { connectMongoDB } from "./Config/ConnectDB.js";
import bookRoute from "./Route/Book.Route.js";
import cors from "cors";
import { jwtAuthentication } from "./Middleware/JWTAuthentication.js";
import { corsConfig } from "./Config/CorsConfig.js";

const port = process.env.PORT;
const app = express();

// Middleware
app.use(cors(corsConfig));
app.use(express.json());
app.use(jwtAuthentication);

// Route
app.use("/book-service", bookRoute);

// Browser Debug
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  connectMongoDB();
  console.log(`http://localhost:${port}`);
});
