import React from 'react'
import { Link } from 'react-router-dom'
import { useFavoritesStore } from '../../store/favorites'

export const Header = () => {
  const favorites = useFavoritesStore(state => state.favorites)

  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="text-3xl">🎬</div>
          <h1 className="text-2xl font-bold">Movie Explorer</h1>
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-amber-400 transition">Home</Link>
          <Link to="/movies" className="hover:text-amber-400 transition">Movies</Link>
          <Link to="/actors" className="hover:text-amber-400 transition">Actors</Link>
          <Link to="/directors" className="hover:text-amber-400 transition">Directors</Link>
          <Link to="/favorites" className="hover:text-amber-400 transition flex items-center gap-1">
            ❤️ ({favorites.length})
          </Link>
        </div>
      </nav>
    </header>
  )
}
