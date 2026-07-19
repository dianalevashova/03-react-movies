import axios from 'axios';
import type { Movie } from '../types/movie';

const myKey = import.meta.env.VITE_TMDB_TOKEN;
interface MovieHttpResponse {
  results: Movie[];
}

export default async function fetchMovies(query: string): Promise<Movie[]> {
  const options = {
    params: {
      query,
    },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  };
  const response = await axios.get<MovieHttpResponse>(
    'https://api.themoviedb.org/3/search/movie',
    options
  );
  return response.data.results;
}
