import axios from "axios";

const login = async (username, password) => {
  try {
    const response = await axios.post(
      "https://t-adria.com/api/login",
      {
        username,
        password,
        mac: "a1:b2:c3:d4:b5",
        device_uid: "TV12345",
        language_id: "2",
        device_type: "SamsungTv",
      },
      {
        headers: {
          reskin: "adria",
          "language-id": "2",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default login;
