import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Navbar } from "./Navbar";

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
const omdbApiKey = import.meta.env.VITE_OMDB_API_KEY;

function Movie() {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    //  https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&language=en-US&sort_by=popularity.desc&page=${page}
    // Fetch movie data using the movie ID here
    // and set the fetched data to the movieData state

    async function getTotalpages() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbApiKey}&language=en-US`
        );
        setMovieData(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    getTotalpages();
  }, [id]);

  if (!movieData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="movie-page flex flex-col items-center">
        <div className="movie-header flex flex-col items-center">
          <h1 className="font-bold">{movieData.title}</h1>
          <h3 className="font-light text-sm">{movieData.release_date}</h3>
        </div>
        <div className="movie-details flex flex-col items-center">
          <div className="movie-poster">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
              alt={movieData.title}
            />
          </div>
          <div className="movie-info flex flex-col items-center">
            <h2 className="mt-5">Overview</h2>
            <p className="max-w-md border-b-2 border-slate-800">
              {movieData.overview}
            </p>
            <div className="flex mt-5">
              <div className="mr-5">
                <h1 className="font-semibold text-lg">Genres</h1>
                <ul>
                  {movieData.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </div>
              <div className="ml-5">
                <h2 className="font-semibold text-lg">Rating</h2>
                <p>{movieData.vote_average}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;
