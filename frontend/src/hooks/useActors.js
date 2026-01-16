import { useState, useEffect } from 'react'
import { apiClient } from '../../services/api'

export const useActors = (filters = {}) => {
  const [actors, setActors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await apiClient.getActors(filters)
        setActors(response.data)
        setError(null)
      } catch (err) {
        setError('Failed to load actors')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchActors()
  }, [JSON.stringify(filters)])
  console.log("actors1 ", actors)

  return { actors, loading, error }
}
