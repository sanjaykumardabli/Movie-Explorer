import { useState, useEffect } from 'react'
import { apiClient } from '../../services/api'

export const useDirectors = (filters = {}) => {
  const [directors, setDirectors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDirectors = async () => {
      try {
        const response = await apiClient.getDirectors(filters)
        setDirectors(response.data)
        setError(null)
      } catch (err) {
        setError('Failed to load directors')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDirectors()
  }, [JSON.stringify(filters)])

  return { directors, loading, error }
}
