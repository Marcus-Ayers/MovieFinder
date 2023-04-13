import axios from "axios";

const tmdbApiKey = "e0a2e44cce11e2aeb9a8969f5f37722e";
const omdbApiKey = "3d48259b";

export async function fetchMoviesByAndGenres(genreIds) {
  try {
    const genreIdsString = genreIds.join(",");
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&language=en-US&sort_by=popularity.desc&with_genres=${genreIdsString}`
    );

    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies by genres:", error);
  }

  return [];
}
export async function fetchMoviesByOrGenres(genreIds) {
  const allMovies = [];

  for (const genreId of genreIds) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&language=en-US&sort_by=popularity.desc&with_genres=${genreId}`
      );

      allMovies.push(...response.data.results);
    } catch (error) {
      console.error("Error fetching movies by genres:", error);
    }
  }

  return allMovies;
}
