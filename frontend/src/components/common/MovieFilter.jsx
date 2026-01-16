import React, { useState } from 'react'
import { useGenres } from '../../hooks/useGenres'
import { useDirectors } from '../../hooks/useDirectors'

export const MovieFilter = ({ onFilter }) => {
  const { genres } = useGenres()
  const { directors } = useDirectors()
  const [filters, setFilters] = useState({
    title: '',
    genres: [],
    director: null,
    release_year_min: null,
    release_year_max: null,
  })

  const handleChange = (field, value) => {
    console.log("field, value ", field, value)
    const updated = { ...filters, [field]: value }
    setFilters(updated)
    onFilter(updated)
  }

  return (
    <div className="bg-slate-800 p-4 rounded-lg space-y-4">
      <div>
        <label className="block text-white font-semibold mb-2">Title</label>
        <input
          type="text"
          value={filters.title}
          onChange={e => handleChange('title', e.target.value)}
          placeholder="Search by title..."
          className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-amber-500"
        />
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">Genres</label>
        <div className="space-y-2">
          {genres.map(genre => (
            <label key={genre.id} className="flex items-center gap-2 text-gray-300">
              <input
                type="checkbox"
                checked={filters.genres.includes(genre.id)}
                onChange={e => {
                  const updated = e.target.checked
                    ? [...filters.genres, genre.id]
                    : filters.genres.filter(id => id !== genre.id)
                  handleChange('genres', updated)
                }}
                className="rounded"
              />
              {genre.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">Director</label>
        <select
          value={filters.director || ''}
          onChange={e => handleChange('director', e.target.value ? Number(e.target.value) : null)}
          className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-slate-600"
        >
          <option value="">Any Director</option>
          {directors.map(director => (
            <option key={director.id} value={director.id}>
              {director.full_name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-white font-semibold mb-2 text-sm">Min Year</label>
          <input
            type="number"
            value={filters.release_year_min || ''}
            onChange={e => handleChange('release_year_min', e.target.value ? Number(e.target.value) : null)}
            placeholder="From"
            className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-slate-600"
          />
        </div>
        <div>
          <label className="block text-white font-semibold mb-2 text-sm">Max Year</label>
          <input
            type="number"
            value={filters.release_year_max || ''}
            onChange={e => handleChange('release_year_max', e.target.value ? Number(e.target.value) : null)}
            placeholder="To"
            className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-slate-600"
          />
        </div>
      </div>
    </div>
  )
}
