import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  publishedYear: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  availableCopies: {
    type: Number,
    required: true,
  },
  importDate: {
    type: Date,
    required: true,
  },
  image: {
    type: Buffer,
    required: true,
  },
  imageMimeType: {
    type: String,
    required: true,
  },
});

export const Book = mongoose.model("Book", BookSchema);
