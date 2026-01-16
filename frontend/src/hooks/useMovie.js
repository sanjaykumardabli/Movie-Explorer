import { useState, useEffect } from 'react'
import { apiClient } from '../../services/api'

export const useMovie = (movieId) => {
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!movieId) return

    const fetchMovie = async () => {
      try {
        const response = await apiClient.getMovieDetail(Number(movieId))
        setMovie(response.data)
        setError(null)
      } catch (err) {
        setError('Failed to load movie')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [movieId])

  return { movie, loading, error }
}
