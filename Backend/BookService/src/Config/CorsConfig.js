const userServiceUrl = process.env.USER_SERVICE_URL;
const borrowingServiceUrl = process.env.BORROWING_SERVICE_URL;
const clientUrl = process.env.FRONTEND_URL;

export const corsConfig = {
  origin: [userServiceUrl, borrowingServiceUrl, clientUrl],
  method: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};
