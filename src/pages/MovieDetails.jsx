import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getSimilarMovies,
  getPosterUrl,
  getBackdropUrl,
} from "../services/tmdbApi";

import MovieCard from "../components/MovieCard/MovieCard";

import "./MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  const trailer = videos.find(
    (video) =>
      video.type === "Trailer" &&
      video.site === "YouTube"
  );

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieData = await getMovieDetails(id);

        const creditsData =
          await getMovieCredits(id);

        const videosData =
          await getMovieVideos(id);

        const similarData =
          await getSimilarMovies(id);

        setMovie(movieData);
        setCredits(creditsData);
        setVideos(videosData);
        setSimilarMovies(similarData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieData();

    window.scrollTo(0, 0);
  }, [id]);

  if (!movie) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      {/* HERO */}
      <section
        className="hero"
        style={{
          backgroundImage: `url(${getBackdropUrl(
            movie.backdrop_path
          )})`,
        }}
      >
        <div className="hero-content">
          <h1>{movie.title}</h1>

          <p>
            {movie.release_date?.slice(0, 4)}
            {" • "}
            {movie.genres
              ?.map((genre) => genre.name)
              .join(", ")}
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="section-card">
        <div className="info-card">
          <img
            src={getPosterUrl(movie.poster_path)}
            alt={movie.title}
          />

          <div>
            <h2>Story</h2>

            <p>{movie.overview}</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section-card">
        <h2>Movie Details</h2>

        <div className="movie-stats">
          <div>
            <strong>Runtime</strong>
            <p>{movie.runtime} min</p>
          </div>

          <div>
            <strong>Language</strong>
            <p>{movie.original_language}</p>
          </div>

          <div>
            <strong>Popularity</strong>
            <p>{Math.round(movie.popularity)}</p>
          </div>

          <div>
            <strong>Release Date</strong>
            <p>{movie.release_date}</p>
          </div>
        </div>
      </section>

      {/* RATING */}
      <motion.section
  className="section-card"
  initial={{
    opacity: 0,
    y: 100,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
  }}
  viewport={{
    once: true,
  }}
  transition={{
    duration: 0.8,
  }}
>
        <div className="rating-box">
          <h1>
            ⭐ {movie.vote_average?.toFixed(1)}
          </h1>

          <p>TMDB Rating</p>
        </div>
      </motion.section>

      {/* TRAILER */}
      {trailer && (
        <section className="section-card">
          <h2>Official Trailer</h2>

          <iframe
            width="100%"
            height="700"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Movie Trailer"
            allowFullScreen
          />
        </section>
      )}

      {/* CAST */}
      <section className="section-card">
        <h2>Cast</h2>

        <div className="cast-grid">
          {credits?.cast
            ?.slice(0, 10)
            .map((actor) => (
              <div
                className="cast-card"
                key={actor.id}
              >
                {actor.profile_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                  />
                )}

                <h4>{actor.name}</h4>
              </div>
            ))}
        </div>
      </section>

      {/* SIMILAR MOVIES */}
      <section className="section-card">
        <h2>More Like This</h2>

        <div className="movie-row">
          {similarMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default MovieDetails;