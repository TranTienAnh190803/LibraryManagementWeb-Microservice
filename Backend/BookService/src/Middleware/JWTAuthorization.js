export const jwtAuthorization = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }

  const checkRole = (req, res, next) => {
    if (!req.jwt) {
      return;
    }
    if (roles.some((value) => value === req.jwt.role)) {
      return next();
    }

    return res
      .status(403)
      .json({ success: false, message: "You Don't Have Authority To Access" });
  };

  return checkRole;
};
