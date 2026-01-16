import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useMovie } from '../../hooks/useMovie'
import { useFavoritesStore } from '../../store/favorites'

export const MovieDetail = () => {
  const { id } = useParams()
  const { movie, loading, error } = useMovie(id)
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore()

  if (loading) return <div className="text-center py-20 text-white">Loading...</div>
  if (error || !movie) return <div className="text-center py-20 text-red-500">{error || 'Movie not found'}</div>

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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          {movie.poster_url && (
            <img src={movie.poster_url} alt={movie.title} className="rounded-lg shadow-lg w-full" />
          )}
        </div>
        <div className="md:col-span-2">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{movie.title}</h1>
              <p className="text-gray-400">{movie.release_year} • {movie.duration_minutes} min</p>
            </div>
            <button
              onClick={toggleFavorite}
              className={`text-4xl transition ${favorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
            >
              ❤️
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-2xl">⭐</span>
              <span className="text-white text-2xl font-bold">{movie.rating.toFixed(1)}/10</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2">Overview</h2>
            <p className="text-gray-300">{movie.description}</p>
          </div>

          {movie.director && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-2">Director</h3>
              <Link to={`/directors/${movie.director.id}`} className="text-amber-400 hover:underline">
                {movie.director.full_name}
              </Link>
            </div>
          )}

          {movie.genres && movie.genres.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map(genre => (
                  <span key={genre.id} className="bg-amber-600 text-white px-3 py-1 rounded">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {movie.cast && movie.cast.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Cast</h3>
              <div className="grid grid-cols-2 gap-4">
                {movie.cast.map(castMember => (
                  <Link key={castMember.id} to={`/actors/${castMember.actor.id}`} className="group">
                    <div className="bg-slate-700 p-3 rounded hover:bg-slate-600 transition">
                      <p className="font-semibold text-white group-hover:text-amber-400">{castMember.actor.full_name}</p>
                      <p className="text-sm text-gray-400">as {castMember.character_name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
