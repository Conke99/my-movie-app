import axios from "axios";

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

export default fetchMovies;
