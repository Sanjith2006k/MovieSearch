// src/services/tmdbApi.js

const API_KEY=90e183044885d3b34d313e64ed56a9c6;

const BASE_URL = "https://api.themoviedb.org/3";

export const searchMovies = async (query) => {
  if (!query) return [];

  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );

  const data = await response.json();

  return data.results || [];
};

export const getMovieDetails = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );

  return await response.json();
};

export const getSimilarMovies = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data.results || [];
};

export const getMovieCredits = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
  );

  return await response.json();
};

export const getMovieVideos = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data.results || [];
};

export const getPosterUrl = (path) => {
  return `https://image.tmdb.org/t/p/w500${path}`;
};

console.log("tmdbApi module loaded", { hasKey: !!API_KEY });

export const getBackdropUrl = (path) => {
  return `https://image.tmdb.org/t/p/original${path}`;
};


export const getTrendingMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data.results || [];
};

export const getPopularMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data.results || [];
};

export const getTopRatedMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data.results || [];
};
const tmdbApi = {
  searchMovies,
  getMovieDetails,
  getSimilarMovies,
  getMovieCredits,
  getMovieVideos,
  getPosterUrl,
  getBackdropUrl,
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
};


export default tmdbApi;
