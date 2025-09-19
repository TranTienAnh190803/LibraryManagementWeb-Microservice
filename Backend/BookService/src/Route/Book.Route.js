import express from "express";
import { upload } from "../Config/MulterConfig.js";
import { jwtAuthorization } from "../Middleware/JWTAuthorization.js";
import {
  addBook,
  deleteBook,
  editBook,
  getAllBook,
  getBookInfo,
  manageBookBorrowing,
  manageBookReturning,
  showImage,
} from "../Controller/Book.Controller.js";

const route = express.Router();

route.post(
  "/add-book",
  jwtAuthorization("LIBRARIAN"),
  upload.single("image"),
  addBook
);
route.patch(
  "/edit-book",
  jwtAuthorization("LIBRARIAN"),
  upload.single("image"),
  editBook
);
route.post(
  "/show-book-image",
  jwtAuthorization("LIBRARIAN"),
  upload.single("image"),
  showImage
);
route.get("/get-all-book", getAllBook);
route.get("/get-book-info", getBookInfo);
route.delete("/delete-book", jwtAuthorization("LIBRARIAN"), deleteBook);
route.patch(
  "/manage-book-borrowing",
  jwtAuthorization("MEMBER"),
  manageBookBorrowing
);
route.patch(
  "/manage-book-returning",
  jwtAuthorization("MEMBER"),
  manageBookReturning
);

// Search Book

export default route;
