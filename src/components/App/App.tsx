import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.css';
import type { Movie } from '../../types/movie';
import fetchMovies from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import MovieModal from '../MovieModal/MovieModal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function App() {
  const [movie, setMovie] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [chooseMovie, setChooseMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const data = await fetchMovies(query);
      if (data.length === 0) {
        setIsError(true);
        setMovie([]);
        return;
      }
      setMovie(data);
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  const handleSelect = (id: number) => {
    const selected = movie.find(key => key.id === id);
    if (selected) {
      setChooseMovie(selected);
    }
  };

  const closeModal = () => setChooseMovie(null);
  return (
    <div className={css.app}>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && movie.length > 0 && (
        <MovieGrid movies={movie} onSelect={handleSelect} />
      )}
      {chooseMovie && <MovieModal movie={chooseMovie} onClose={closeModal} />}
    </div>
  );
}

export default App;
