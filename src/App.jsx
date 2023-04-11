import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [pages, setPages] = useState();
  const [page, setPage] = useState(1);

  const tmdbApiKey = "e0a2e44cce11e2aeb9a8969f5f37722e";
  const omdbApiKey = "3d48259b";

  async function getTotalpages() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${tmdbApiKey}&language=en-US&page=1`
      );
      setPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }
  getTotalpages();

  async function fetchTopRatedMovies() {
    const allMovies = [];
    for (let i = 0; i < 20; i++) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${tmdbApiKey}&language=en-US&page=${page}`
        );
        allMovies.push(response.data.results[i]);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    setMovies(allMovies);
  }
  return (
    <div className="movie-finder">
      <button onClick={() => fetchTopRatedMovies()}>Find Movies</button>
      {movies.map((movie, index) => {
        console.log(movie);
        return (
          <div key={index} className="movie-card">
            <h3>{movie.title}</h3>
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.Title}
            />
          </div>
        );
      })}
    </div>
  );
}

export default App;
