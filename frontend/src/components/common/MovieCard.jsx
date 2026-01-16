import React from 'react'
import { Link } from 'react-router-dom'
import { useFavoritesStore } from '../../store/favorites'

export const MovieCard = ({ movie }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore()
  const favorite = isFavorite(movie.id, 'movie')

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(movie.id, 'movie')
    } else {
      addFavorite({
        id: movie.id,
        type: 'movie',
        title: movie.title,
        addedAt: new Date().toISOString(),
      })
    }
  }

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition transform hover:scale-105">
        {movie.poster_url && (
          <img src={movie.poster_url} alt={movie.title} className="w-full h-64 object-cover" />
        )}
        <div className="p-4">
        <Link to={`/movies/${movie.id}`}>
          <h3 className="text-lg font-bold text-white hover:text-amber-400 transition truncate">
            {movie.title}
          </h3>
          <p className="text-gray-400 text-sm">{movie.release_year}</p>
    </Link>
          <div className="flex items-center justify-between mt-2">
            <div className="flex gap-1">
              <span className="text-yellow-400">⭐</span>
              <span className="text-white font-semibold">{movie.rating.toFixed(1)}</span>
            </div>
            <button
              onClick={toggleFavorite}
              className={`text-xl transition ${favorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
            >
              {favorite ? '❤️' : '🤍'}
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
            {movie.genres?.slice(0, 2).map(genre => (
              <span key={genre.id} className="bg-amber-600 text-white text-xs px-2 py-1 rounded">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
  )
}
