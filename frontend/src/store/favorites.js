import { create } from 'zustand'

export const useFavoritesStore = create((set, get) => ({
  favorites: [],

  addFavorite: (item) => {
    set(state => {
      const updated = [...state.favorites, item]
      localStorage.setItem('favorites', JSON.stringify(updated))
      return { favorites: updated }
    })
  },

  removeFavorite: (id, type) => {
    set(state => {
      const updated = state.favorites.filter(f => !(f.id === id && f.type === type))
      localStorage.setItem('favorites', JSON.stringify(updated))
      return { favorites: updated }
    })
  },

  isFavorite: (id, type) => {
    return get().favorites.some(f => f.id === id && f.type === type)
  },

  clearAll: () => {
    localStorage.removeItem('favorites')
    set({ favorites: [] })
  },

  loadFromLocalStorage: () => {
    const stored = localStorage.getItem('favorites')
    if (stored) {
      try {
        set({ favorites: JSON.parse(stored) })
      } catch (e) {
        console.error('Failed to parse favorites:', e)
      }
    }
  },
}))

