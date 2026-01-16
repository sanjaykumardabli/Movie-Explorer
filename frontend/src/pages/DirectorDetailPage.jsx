import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { apiClient } from '../../services/api'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { ErrorMessage } from '../components/common/ErrorMessage'

const DirectorDetailPage = () => {
  const { id } = useParams()
  const [director, setDirector] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDirector = async () => {
      try {
        const response = await apiClient.getDirectorDetail(Number(id))
        setDirector(response.data)
      } catch (err) {
        setError('Failed to load director')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchDirector()
  }, [id])

  if (loading) return <LoadingSpinner />
  if (error || !director) return <ErrorMessage message={error || 'Director not found'} />

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          {director.image_url && (
            <img src={director.image_url} alt={director.full_name} className="rounded-lg shadow-lg w-full" />
          )}
        </div>
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold text-white mb-2">{director.full_name}</h1>
          <p className="text-gray-400 mb-4">Born: {director.birth_date} • {director.nationality}</p>
          
          {director.bio && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-2">Biography</h2>
              <p className="text-gray-300">{director.bio}</p>
            </div>
          )}

          {director.movies && director.movies.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Filmography</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {director.movies.map(movie => (
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

export default DirectorDetailPage
