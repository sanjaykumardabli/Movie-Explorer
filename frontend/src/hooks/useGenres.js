import { useState, useEffect } from 'react'
import { apiClient } from '../../services/api'

export const useGenres = () => {
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await apiClient.getGenres()
        setGenres(response.data)
        setError(null)
      } catch (err) {
        setError('Failed to load genres')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchGenres()
  }, [])

  return { genres, loading, error }
}
