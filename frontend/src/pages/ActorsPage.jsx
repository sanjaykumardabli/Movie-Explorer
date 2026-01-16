import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useActors } from '../hooks/useActors'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { ErrorMessage } from '../components/common/ErrorMessage'

const ActorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { actors, loading, error } = useActors()

  const filteredActors = actors.filter(actor =>
    actor.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <LoadingSpinner />

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-white mb-8">🎭 Actors</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search actors..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-600 focus:border-amber-500"
        />
      </div>

      {error && <ErrorMessage message={error} />}

      {filteredActors.length === 0 && !loading && (
        <div className="text-gray-400 text-center py-20">No actors found.</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredActors.map(actor => (
          <Link key={actor.id} to={`/actors/${actor.id}`}>
            <div className="bg-slate-800 rounded-lg overflow-hidden hover:shadow-lg transition transform hover:scale-105">
              {actor.image_url && (
                <img src={actor.image_url} alt={actor.full_name} className="w-full h-64 object-cover" />
              )}
              <div className="p-4">
                <h3 className="font-bold text-white hover:text-amber-400">{actor.full_name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-gray-400">{actor.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ActorsPage
