import express from "express";
import { upload } from "../Config/MulterConfig.js";
import { jwtAuthorization } from "../Middleware/JWTAuthorization.js";
import { addBook, getAllBook } from "../Controller/Book.Controller.js";

const route = express.Router();

route.post(
  "/add-book",
  jwtAuthorization("LIBRARIAN"),
  upload.single("image"),
  addBook
);
route.get("/get-all-book", getAllBook);

export default route;
