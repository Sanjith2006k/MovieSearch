import { Link } from "react-router-dom";
import { getPosterUrl } from "../../services/tmdbApi";
import { motion } from "motion/react";
import "./MovieCard.css";

function MovieCard({ movie }) {

  const handleRecentMovie = () => {
    const recentMovies =
      JSON.parse(
        localStorage.getItem("recentMovies")
      ) || [];

    const updated = [
      movie,
      ...recentMovies.filter(
        (m) => m.id !== movie.id
      ),
    ].slice(0, 10);

    localStorage.setItem(
      "recentMovies",
      JSON.stringify(updated)
    );
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="movie-link"
      onClick={handleRecentMovie}
    >
      <motion.div
  className="movie-card"
  whileHover={{
    scale: 1.05,
    y: -10,
  }}
>
        <img
          src={getPosterUrl(movie.poster_path)}
          alt={movie.title}
        />

        <div className="movie-overlay">
          <div className="movie-content">
            <h3>{movie.title}</h3>

            <p>
              {movie.release_date?.slice(0, 4)}
            </p>

            <div className="rating">
              ⭐ {movie.vote_average?.toFixed(1)}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default MovieCard;