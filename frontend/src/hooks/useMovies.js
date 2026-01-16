import { useState, useEffect } from 'react'
import { apiClient } from '../../services/api'

export const useMovies = (filters = {}) => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      try {
        const response = await apiClient.getMovies(filters)
        console.log("response ", response)
        setMovies(response.data.results)
        setError(null)
      } catch (err) {
        setError('Failed to load movies')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [JSON.stringify(filters)])

  return { movies, loading, error, setMovies, setError }
}
