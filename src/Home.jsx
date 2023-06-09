import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./App.css";
import { fetchMoviesByAndGenres, fetchMoviesByOrGenres } from "./Genre.jsx";
import { Navbar } from "./Navbar.jsx";
import { formatDate } from "./Utils.jsx";

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
const omdbApiKey = import.meta.env.VITE_OMDB_API_KEY;

function Home() {
  const [movies, setMovies] = useState([]);
  const [pages, setPages] = useState();
  const [page, setPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentFetchFunction, setCurrentFetchFunction] = useState(
    () => (page) => fetchTopRatedMovies(page)
  );

  useEffect(() => {
    if (selectedGenres.length > 0) {
      fetchData();
    } else {
      fetchTopRatedMovies(page);
    }
  }, [page]);

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
  // https://api.themoviedb.org/3/movie/502356?api_key=${tmdbApiKey}&language=en-US
  // https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&language=en-US&sort_by=popularity.desc&page=${page}

  async function fetchTopRatedMovies(page) {
    const allMovies = [];
    for (let i = 0; i < 20; i++) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&language=en-US&sort_by=popularity.desc&page=${page}`
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
    currentFetchFunction(page + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      currentFetchFunction(page - 1);
    }
  };

  const andGenres = async (page = 1) => {
    const movies = await fetchMoviesByAndGenres(selectedGenres, page);
    setMovies(movies);
  };

  const orGenres = async (page = 1) => {
    const movies = await fetchMoviesByOrGenres(selectedGenres, page);
    setMovies(movies);
  };

  const handleRadioButtonChange = (event) => {
    setToggle(event.target.value === "true");
  };

  const fetchData = () => {
    if (toggle) {
      orGenres(page);
      setCurrentFetchFunction(
        () => (page) => fetchMoviesByOrGenres(selectedGenres, page)
      );
    } else {
      andGenres(page);
      setCurrentFetchFunction(
        () => (page) => fetchMoviesByAndGenres(selectedGenres, page)
      );
    }
  };
  const findMovies = () => {
    if (page == 1) {
      setPage(1);
      fetchData(1);
    } else {
      setPage(1);
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

  const handleGenreClick = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  return (
    <div className="movie-finder">
      <Navbar />
      <div className="flex flex-col lg:flex-row justify-center">
        <div className=" w-64 flex-none mr-5 ml-auto mr-auto md:ml-0 md:mr-0">
          <h1 className="mb-6 mt-5 font-semibold text-3xl">Popular Movies</h1>
          <div className="flex flex-wrap">
            <div className="flex justify-between min-w-full mb-10">
              <button
                className="bg-white rounded-md p-1 drop-shadow-md"
                onClick={() => prevPage()}
              >
                Previous page
              </button>
              <button
                className="bg-white rounded-md p-1 drop-shadow-md"
                onClick={() => nextPage()}
              >
                Next page
              </button>
            </div>
          </div>
          <div className="relative block drop-shadow-md">
            <button
              className={`text-lg font-semibold flex align-start items-center pl-2 bg-white w-full h-9  ${
                dropdownOpen
                  ? "rounded-t-md border-b border-slate-600"
                  : "rounded-md "
              }`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Filters{" "}
              {dropdownOpen ? (
                <span className="ml-auto">&#9662;</span>
              ) : (
                <span className="ml-auto">&#9656;</span>
              )}
            </button>
            {dropdownOpen && (
              <div className="bg-white rounded-b-md">
                <div className="py-1">
                  <p className="pl-2 mt-3"> Genres </p>
                  {genres.map((genre) => (
                    <button
                      key={genre.id}
                      className={` w-fit text-left px-3 py-1 m-1 rounded-3xl text-white ${
                        selectedGenres.includes(genre.id)
                          ? "bg-green-600"
                          : "bg-gray-600"
                      }`}
                      onClick={() => handleGenreClick(genre.id)}
                    >
                      {genre.name}
                    </button>
                  ))}
                  <div className="flex flex-wrap">
                    {" "}
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
                  <div className="bg-green-700 rounded-md flex justify-center mt-3">
                    <button onClick={findMovies}>Find Movies</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex max-w-6xl felx-row flex-wrap justify-center md:justify-normal">
          {movies.map((movie, index) => {
            return (
              <Link to={`/movie/${movie.id}`} key={index}>
                <div key={index} className="movie-card mx-3 mt-10">
                  <img
                    className="rounded-t-md"
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.Title}
                  />
                  <div className="h-16 bg-white w-full max-w-200 rounded-b-md drop-shadow-md">
                    <h4 className="text-black mx-1 text-md">{movie.title}</h4>
                    <h3 className="text-black mx-1 text-sm">
                      {formatDate(movie.release_date)}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
