import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/common/Header'
import { ErrorBoundary } from './components/common/ErrorBoundary'
import { useFavoritesStore } from './store/favorites'
import HomePage from './pages/HomePage'
import MoviesPage from './pages/MoviesPage'
import MovieDetailPage from './pages/MovieDetailPage'
import ActorsPage from './pages/ActorsPage'
import ActorDetailPage from './pages/ActorDetailPage'
import DirectorsPage from './pages/DirectorsPage'
import DirectorDetailPage from './pages/DirectorDetailPage'
import FavoritesPage from './pages/FavoritesPage'
import './styles/App.css'

const App = () => {
  const loadFromLocalStorage = useFavoritesStore(state => state.loadFromLocalStorage)

  useEffect(() => {
    loadFromLocalStorage()
  }, [loadFromLocalStorage])

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-950">
          <Header />
          <main className="py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/movies/:id" element={<MovieDetailPage />} />
              <Route path="/actors" element={<ActorsPage />} />
              <Route path="/actors/:id" element={<ActorDetailPage />} />
              <Route path="/directors" element={<DirectorsPage />} />
              <Route path="/directors/:id" element={<DirectorDetailPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </main>
          <footer className="bg-slate-900 text-gray-400 text-center py-4 mt-12">
            <p>&copy; 2024 Movie Explorer. All rights reserved.</p>
          </footer>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
