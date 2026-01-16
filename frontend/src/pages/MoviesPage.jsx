import React, { useState } from 'react'
import { useMovies } from '../hooks/useMovies'
import { MovieCard } from '../components/common/MovieCard'
import { MovieFilter } from '../components/common/MovieFilter'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { ErrorMessage } from '../components/common/ErrorMessage'

const MoviesPage = () => {
  const [filters, setFilters] = useState({})
  const { movies, loading, error } = useMovies(filters)

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-white mb-8">🎬 Movies</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <MovieFilter onFilter={setFilters} />
        </div>

        <div className="lg:col-span-3">
          {error && <ErrorMessage message={error} />}

          {loading && <LoadingSpinner />}

          {!loading && movies.length === 0 && (
            <div className="text-gray-400 text-center py-20">No movies found. Try adjusting your filters.</div>
          )}

          {!loading && movies.length > 0 && (
            <>
              <p className="text-gray-400 mb-4">Found {movies.length} movie(s)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {movies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default MoviesPage
