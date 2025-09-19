import axios from "axios";

const userServiceUrl = process.env.USER_SERVICE_URL;

export const sendNotification = async (token) => {
  try {
    const response = await axios.post(
      `${userServiceUrl}/librarian/send-new-book-notification`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
