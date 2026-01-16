import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/'

class APIClient {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.client.interceptors.response.use(
      response => response,
      (error) => {
        console.error('API Error:', error.message)
        return Promise.reject(error)
      }
    )
  }

  /**
   * Fetch all movies with optional filters
   * @param {Object} filters - Query parameters for filtering
   */
  async getMovies(filters) {
    const params = new URLSearchParams()
    console.log("filters ", filters)
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        console.log("value ", value)
        console.log("value1 ", value !== null)
        if (value && value !== null && value !== undefined) {
          if (Array.isArray(value)) {
            value.forEach(item => {
              params.append(key, item);
            });
          } else {
            params.append(key, String(value))
          }
        }
      })
    }
    return this.client.get(`/movies/?${params.toString()}`)
  }

  /**
   * Get detailed information about a specific movie
   */
  async getMovieDetail(id) {
    return this.client.get(`/movies/${id}/`)
  }

  /**
   * Search movies by query
   */
  async searchMovies(query) {
    return this.client.get('/movies/search/', { params: { q: query } })
  }

  /**
   * Get trending movies
   */
  async getTrendingMovies() {
    return this.client.get('/movies/trending/')
  }

  /**
   * Get recently released movies
   */
  async getRecentMovies() {
    return this.client.get('/movies/recent/')
  }

  /**
   * Fetch all actors
   */
  async getActors(filters) {
    const params = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, String(value))
      })
    }
    return this.client.get(`/actors/?${params.toString()}`)
  }

  /**
   * Get detailed actor information
   */
  async getActorDetail(id) {
    return this.client.get(`/actors/${id}/`)
  }

  /**
   * Fetch all directors
   */
  async getDirectors(filters) {
    const params = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, String(value))
      })
    }
    return this.client.get(`/directors/?${params.toString()}`)
  }

  /**
   * Get detailed director information
   */
  async getDirectorDetail(id) {
    return this.client.get(`/directors/${id}/`)
  }

  /**
   * Fetch all genres
   */
  async getGenres() {
    return this.client.get('/genres/')
  }
}

export const apiClient = new APIClient()
