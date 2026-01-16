import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiClient } from '../../services/api'
import { MovieCard } from '../components/common/MovieCard'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { ErrorMessage } from '../components/common/ErrorMessage'

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [recentMovies, setRecentMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendingRes, recentRes] = await Promise.all([
          apiClient.getTrendingMovies(),
          apiClient.getRecentMovies(),
        ])
        setTrendingMovies(trendingRes.data)
        setRecentMovies(recentRes.data)
      } catch (err) {
        setError('Failed to load movies')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <LoadingSpinner />

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">🎬 Welcome to Movie Explorer</h1>
        <p className="text-xl text-gray-400 mb-6">Discover, explore, and save your favorite films</p>
        <div className="flex gap-4 justify-center">
          <Link to="/movies" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition">
            Browse Movies
          </Link>
          <Link to="/actors" className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition">
            Explore Actors
          </Link>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6">🔥 Trending Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {trendingMovies.slice(0, 5).map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-6">📺 Recently Released</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {recentMovies.slice(0, 5).map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
