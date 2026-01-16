/**
 * Handle API errors and return user-friendly messages
 */
export const handleApiError = (error) => {
    const status = error.response?.status
  
    switch (status) {
      case 400:
        return 'Invalid request parameters'
      case 404:
        return 'Resource not found'
      case 500:
        return 'Server error. Please try again later'
      case 503:
        return 'Service temporarily unavailable'
      default:
        return 'An error occurred. Please try again'
    }
  }
  
  /**
   * Debounce function for search inputs
   */
  export const debounce = (func, delay) => {
    let timeout
    return (...args) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), delay)
    }
  }
  
  /**
   * Format date string
   */
  export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
  