import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute ({ children }) {
  const Logged = localStorage.getItem('Logged')
  return Logged ? children : <Navigate to='/' replace />
}
