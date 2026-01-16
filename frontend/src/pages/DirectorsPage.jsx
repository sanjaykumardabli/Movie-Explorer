import React from 'react'
import { Link } from 'react-router-dom'
import { useDirectors } from '../hooks/useDirectors'
import { LoadingSpinner } from '../components/common/LoadingSpinner'

const DirectorsPage = () => {
  const { directors, loading } = useDirectors()

  if (loading) return <LoadingSpinner />

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-white mb-8">🎬 Directors</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {directors.map(director => (
          <Link key={director.id} to={`/directors/${director.id}`}>
            <div className="bg-slate-800 rounded-lg overflow-hidden hover:shadow-lg transition transform hover:scale-105 p-4">
              <h3 className="font-bold text-white hover:text-amber-400 text-lg">{director.full_name}</h3>
              <p className="text-sm text-gray-400 mt-2">{director.nationality || 'Unknown'}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DirectorsPage
