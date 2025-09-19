import { sendNotification } from "../API/UserService.js";
import { Book } from "../Model/Book.Model.js";

export const addBook = async (req, res) => {
  const bookInfo = req.body;
  const image = req.file?.buffer;
  const imageMimeType = req.file?.mimetype;

  try {
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    const bookForm = {
      ...bookInfo,
      importDate: today,
      image: image,
      imageMimeType: imageMimeType,
    };
    await Book.create(bookForm);
    await sendNotification(req.token);

    return res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Added Book Successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, statusCode: 500, message: error.message });
  }
};

export const getAllBook = async (req, res) => {
  try {
    const allBook = await Book.find().select("-__v").lean();

    if (allBook.length > 0) {
      const data = allBook.map((book) => {
        const { image, imageMimeType, ...rest } = book;
        const imageBase64 = `data:${imageMimeType};base64,${image.toString(
          "base64"
        )}`;
        return { ...rest, image: imageBase64 };
      });

      return res
        .status(200)
        .json({ success: true, statusCode: 200, dataList: data });
    }
    return res
      .status(200)
      .json({ success: false, statusCode: 200, message: "There Are No Book." });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, statusCode: 500, message: error.message });
  }
};

export const getBookInfo = async (req, res) => {
  const { bookId } = req.query;

  try {
    const bookInfo = await Book.findById(bookId).select("-__v").lean();

    if (bookInfo) {
      return res
        .status(200)
        .json({ success: true, statusCode: 200, data: bookInfo });
    }
    return res
      .status(404)
      .json({ success: false, statusCode: 404, message: "Book Not Found." });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, statusCode: 500, message: error.message });
  }
};

export const editBook = async (req, res) => {
  const editedBook = req.body;
  const { bookId } = req.query;
  const image = req.file?.buffer;
  const imageMimeType = req.file?.mimetype;

  try {
    var bookForm = {
      ...editedBook,
    };

    if (image && imageMimeType) {
      bookForm = { ...bookForm, image: image, imageMimeType: imageMimeType };
    }

    const updatedBook = await Book.findByIdAndUpdate(bookId, bookForm, {
      new: true,
      runValidators: true,
    });

    if (updatedBook) {
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Edited Book Successfully.",
      });
    }
    return res
      .status(404)
      .json({ success: false, statusCode: 404, message: "Book Not Found." });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, statusCode: 500, message: error.message });
  }
};

export const deleteBook = async (req, res) => {
  const { bookId } = req.query;

  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (deletedBook) {
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Deleted Book Successfully",
      });
    }
    return res
      .status(404)
      .json({ success: false, statusCode: 404, message: "Book Not Found." });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, statusCode: 500, message: error.message });
  }
};

export const manageBookBorrowing = async (req, res) => {
  const { bookId } = req.query;

  try {
    const borrowedBook = await Book.findById(bookId);

    if (borrowedBook && borrowedBook.availableCopies > 0) {
      borrowedBook.availableCopies -= 1;
      await borrowedBook.save();
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Book Has Been Added To Your Borrowing List.",
      });
    } else if (borrowedBook.availableCopies <= 0) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Sorry, This Book Is Out Of Available Copy In The Library.",
      });
    } else {
      return res
        .status(404)
        .json({ success: false, statusCode: 404, message: "Book Not Found." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, statusCode: 500, message: error.message });
  }
};

export const manageBookReturning = async (req, res) => {
  const { bookId } = req.query;

  try {
    const returnedBook = await Book.findById(bookId);

    if (returnedBook) {
      returnedBook.availableCopies += 1;
      await returnedBook.save();
      return res.status(200).json({
        success: true,
        statusCode: 200,
      });
    } else {
      return res
        .status(404)
        .json({ success: false, statusCode: 404, message: "Book Not Found." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, statusCode: 500, message: error.message });
  }
};

export const showImage = async (req, res) => {
  const image = req.file?.buffer;
  const imageMimeType = req.file?.mimetype;

  try {
    if (image && imageMimeType) {
      res.set("Content-Type", imageMimeType);
      return res.send(image);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, statusCode: 500, message: error.message });
  }
};
