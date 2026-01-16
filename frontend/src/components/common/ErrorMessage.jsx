import React from 'react'

export const ErrorMessage = ({ message }) => (
  <div className="bg-red-900 border border-red-500 text-red-100 px-4 py-3 rounded mb-6">
    <p className="font-bold">Error</p>
    <p>{message}</p>
  </div>
)
