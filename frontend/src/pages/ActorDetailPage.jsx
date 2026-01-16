import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { apiClient } from '../../services/api'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { ErrorMessage } from '../components/common/ErrorMessage'

const ActorDetailPage = () => {
  const { id } = useParams()
  const [actor, setActor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchActor = async () => {
      try {
        const response = await apiClient.getActorDetail(Number(id))
        setActor(response.data)
      } catch (err) {
        setError('Failed to load actor')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchActor()
  }, [id])

  if (loading) return <LoadingSpinner />
  if (error || !actor) return <ErrorMessage message={error || 'Actor not found'} />

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          {actor.image_url && (
            <img src={actor.image_url} alt={actor.full_name} className="rounded-lg shadow-lg w-full" />
          )}
        </div>
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold text-white mb-2">{actor.full_name}</h1>
          <p className="text-gray-400 mb-4">Born: {actor.birth_date} • {actor.nationality}</p>
          
          {actor.bio && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-2">Biography</h2>
              <p className="text-gray-300">{actor.bio}</p>
            </div>
          )}

          <div className="mb-6">
            <span className="text-yellow-400">⭐</span>
            <span className="text-white font-bold ml-2">{actor.rating.toFixed(1)}/10</span>
          </div>

          {actor.movies && actor.movies.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Filmography</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {actor.movies.map(movie => (
                  <Link key={movie.id} to={`/movies/${movie.id}`} className="group">
                    <div className="bg-slate-800 p-3 rounded hover:bg-slate-700 transition">
                      <p className="font-semibold text-white group-hover:text-amber-400">{movie.title}</p>
                      <p className="text-sm text-gray-400">{movie.release_year}</p>
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

export default ActorDetailPage
