import jwt from "jsonwebtoken";

export const jwtAuthentication = (req, res, next) => {
  try {
    const passList = ["get-all-book", "get-book-info"];
    const path = req.originalUrl.split("/").at(-1);

    if (passList.some((value) => value === path)) {
      return next();
    }

    const authHeader = req.headers.authorization ?? "";

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, process.env.SECRET_KEY, (error, payload) => {
        if (error) {
          return res.status(401).json({
            sucess: false,
            message: "Need Valid Authentication Credentials",
          });
        }
        req.jwt = payload;
      });
      return next();
    }

    return res.status(401).json({ sucess: false, message: "Need Token" });
  } catch (error) {
    return res.status(500).json({ sucess: false, message: error.message });
  }
};
