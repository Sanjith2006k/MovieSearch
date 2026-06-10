# Movie Search App

A modern React + Vite movie discovery app powered by the TMDB API.

## Features

- Search movies with debounced input
- Explore Trending, Popular, and Top Rated sections
- Open a detailed movie page with:
	- Story and metadata
	- Cast preview
	- Official trailer (if available)
	- Similar movie recommendations
- Recently searched terms saved in localStorage
- Interactive navbar with a toggleable help panel

## Tech Stack

- React 19
- React Router DOM
- Vite
- TMDB REST API
- CSS modules/files per component/page

## Project Structure

```text
movie-search-app/
	public/
	src/
		components/
			Loader/
			MovieCard/
			Navbar/
			RecentlyViewed/
			SearchBar/
			SkeletonCard/
		hooks/
			useDebounce.js
		pages/
			Home.jsx
			MovieDetails.jsx
		services/
			tmdbApi.js
		styles/
			global.css
		App.jsx
		main.jsx
	.gitignore
	index.html
	package.json
	vite.config.js
```

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd movie-search-app
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root and add your TMDB API key:

```bash
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

You can generate an API key at: https://www.themoviedb.org/settings/api

### 3. Start development server

```bash
npm run dev
```

Open the local URL shown in terminal (usually `http://localhost:5173`).

## Available Scripts

```bash
npm run dev      # Start local dev server
npm run build    # Create production build
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

## Environment Variables

- `VITE_TMDB_API_KEY`: TMDB API key used by `src/services/tmdbApi.js`

## Troubleshooting

### Blank page on startup

- Confirm `VITE_TMDB_API_KEY` is present in `.env`
- Restart the dev server after adding/changing `.env`
- Hard refresh browser (`Ctrl + Shift + R`)
- Check browser console for import/export errors

### API calls returning empty data

- Verify your TMDB key is valid and active
- Confirm you are using TMDB v3 API key
- Inspect network requests in DevTools

## Security Notes

- Never commit `.env`
- Keep `.env` and `.env.*` ignored in `.gitignore`
- If a key is exposed, rotate it immediately

## License

This project is for learning and personal portfolio use. Add a license file if you plan to open-source it publicly.
