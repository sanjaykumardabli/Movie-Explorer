import React from 'react'
import { useFavoritesStore } from '../store/favorites'

const FavoritesPage = () => {
  const { favorites, clearAll } = useFavoritesStore()

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">❤️ My Favorites</h1>
        {favorites.length > 0 && (
          <button
            onClick={clearAll}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            Clear All
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="text-center text-gray-400 py-20">
          <p className="text-xl">No favorites yet. Start adding movies, actors, and directors!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(fav => (
            <div key={`${fav.id}-${fav.type}`} className="bg-slate-800 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-400 mb-1">
                    {fav.type.toUpperCase()}
                  </p>
                  <h3 className="text-lg font-bold text-white">{fav.title}</h3>
                  <p className="text-gray-400 text-sm mt-2">
                    Added {new Date(fav.addedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FavoritesPage
