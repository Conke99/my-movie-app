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

const fetchMovies = async (genreId) => {
  const API_KEY = "d38aa8716411ef7d8e9054b34a6678ac";
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&api_key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

export { login, fetchMovies };
