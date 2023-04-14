import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Navbar } from "./Navbar";

const tmdbApiKey = "e0a2e44cce11e2aeb9a8969f5f37722e";
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
    <div className="movie-page">
      <Navbar />
      <div className="movie-header">
        <h1>{movieData.title}</h1>
        <h3>{movieData.release_date}</h3>
      </div>
      <div className="movie-details">
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            alt={movieData.title}
          />
        </div>
        <div className="movie-info">
          <h2>Overview</h2>
          <p>{movieData.overview}</p>
          <h2>Genres</h2>
          <ul>
            {movieData.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          <h2>Rating</h2>
          <p>{movieData.vote_average}</p>
        </div>
      </div>
    </div>
  );
}

export default Movie;
