import { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";

function RecentlyViewed() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(
        localStorage.getItem("recentMovies")
      ) || [];

    setMovies(data);
  }, []);

  if (!movies.length) return null;

  return (
    <section>
      <h2>Recently Viewed</h2>

      <div className="movie-row">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </section>
  );
}

export default RecentlyViewed;