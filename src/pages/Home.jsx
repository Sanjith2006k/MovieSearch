import { useEffect, useState } from "react";

import SearchBar from "../components/SearchBar/SearchBar";
import MovieCard from "../components/MovieCard/MovieCard";
import Loader from "../components/Loader/Loader";
import SkeletonCard from "../components/SkeletonCard/SkeletonCard";
import useDebounce from "../hooks/useDebounce";
import RecentlyViewed from "../components/RecentlyViewed/RecentlyViewed";

import {
  searchMovies,
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getPosterUrl,
} from "../services/tmdbApi";

import "./Home.css";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(false);

  const [trending, setTrending] = useState([]);

  const [popular, setPopular] = useState([]);

  const [topRated, setTopRated] = useState([]);

  const [recentSearches, setRecentSearches] = useState([]);

  const debouncedSearch = useDebounce(searchTerm);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const trendingData = await getTrendingMovies();

      const popularData = await getPopularMovies();

      const topRatedData = await getTopRatedMovies();

      setTrending(trendingData);

      setPopular(popularData);

      setTopRated(topRatedData);
    };

    fetchDashboardData();

    const savedSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];

    setRecentSearches(savedSearches);
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!debouncedSearch) return;

      setLoading(true);

      const result = await searchMovies(debouncedSearch);

      setMovies(result || []);

      const updatedSearches = [
        debouncedSearch,
        ...recentSearches.filter((item) => item !== debouncedSearch),
      ].slice(0, 5);

      setRecentSearches(updatedSearches);

      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

      setLoading(false);
    };

    fetchMovies();
  }, [debouncedSearch]);

  return (
    <div className="home">
      {loading && (
        <div className="movie-row">
          {[...Array(8)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      )}

      {/* HERO */}

      {trending[0] && (
        <section
          className="hero-banner"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${trending[0].backdrop_path})`,
          }}
        >
          <div className="hero-overlay">
            <h1>{trending[0].title}</h1>

            <p>{trending[0].overview}</p>
          </div>
        </section>
      )}

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* RECENT SEARCHES */}

      <section className="recent-section">
        <h2>Recent Searches</h2>

        <div className="search-chips">
          {recentSearches.map((item, index) => (
            <button key={index} onClick={() => setSearchTerm(item)}>
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* SEARCH RESULTS */}

      {movies.length > 0 && (
        <>
          <h2>Search Results</h2>

          <div className="movie-row">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      )}

      {/* TRENDING */}

      <section>
        <h2>Trending This Week</h2>

        <div className="movie-row">
          {trending.slice(0, 10).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* POPULAR */}

      <section>
        <h2>Popular Movies</h2>

        <div className="movie-row">
          {popular.slice(0, 10).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* TOP RATED */}

      <section>
        <h2>Top Rated Movies</h2>

        <div className="movie-row">
          {topRated.slice(0, 10).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
