import { useState } from "react";
import axios from "axios";
import "./App.css";
import { fetchMoviesByAndGenres, fetchMoviesByOrGenres } from "./Genre";
import { Navbar } from "./Navbar";

function App() {
  const [movies, setMovies] = useState([]);
  const [pages, setPages] = useState();
  const [page, setPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [toggle, setToggle] = useState(false);

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

  async function fetchTopRatedMovies(page) {
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

  const nextPage = () => {
    setPage(page + 1);
    fetchTopRatedMovies(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
    fetchTopRatedMovies(page - 1);
  };

  const andGenres = async () => {
    const movies = await fetchMoviesByAndGenres(selectedGenres);
    setMovies(movies);
  };
  const orGenres = async () => {
    const movies = await fetchMoviesByOrGenres(selectedGenres);
    setMovies(movies);
  };

  const handleRadioButtonChange = (event) => {
    setToggle(event.target.value === "true");
    console.log(toggle);
  };

  const fetchData = () => {
    if (toggle) {
      orGenres();
    } else {
      andGenres();
    }
  };

  const genres = [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 14, name: "Fantasy" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];

  const handleGenreChange = (event, genreId) => {
    if (event.target.checked) {
      setSelectedGenres([...selectedGenres, genreId]);
    } else {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    }
  };
  fetchTopRatedMovies();

  return (
    <div className="movie-finder">
      <Navbar />
      <div className="flex justify-center">
        <div>
          <button className="" onClick={() => prevPage()}>
            Previous page
          </button>
          <button onClick={() => fetchTopRatedMovies()}>Find Movies</button>
          <button onClick={() => nextPage()}>Next page</button>
          <div>
            <label>
              <input
                className=""
                type="radio"
                value={"true"}
                checked={toggle === true}
                onChange={handleRadioButtonChange}
              />
              Match only one genre
            </label>
            <label>
              <input
                type="radio"
                value={false}
                checked={toggle === false}
                onChange={handleRadioButtonChange}
              />
              Match all selected genres
            </label>
          </div>
          <button onClick={fetchData}>Find Movies</button>

          {genres.map((genre) => (
            <div key={genre.id}>
              <label>
                <input
                  type="checkbox"
                  onChange={(event) => handleGenreChange(event, genre.id)}
                />
                {genre.name}
              </label>
            </div>
          ))}
        </div>
        <div className="flex max-w-screen-2xl felx-row flex-wrap">
          {movies.map((movie, index) => {
            return (
              <div key={index} className="movie-card mx-3 ">
                <img
                  className="rounded-t-md"
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.Title}
                />
                <div className="h-16 bg-white w-50 mb-5">
                  <h3 className="text-lime-300">{movie.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
