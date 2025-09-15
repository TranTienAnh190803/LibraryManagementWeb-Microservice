import { Book } from "../Model/Book.Model.js";

export const addBook = async (req, res) => {
  try {
    const bookInfo = req.body;
    const image = req.file?.buffer;
    const imageMimeType = req.file?.mimetype;

    const bookForm = {
      ...bookInfo,
      image: image,
      imageMimeType: imageMimeType,
    };
    await Book.create(bookForm);

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
    const allBook = await Book.find().lean();

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
