import './App.css'
import React from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import Main from '../Main/Main'
import CurrentUserContext from '../../contexts/CurrentUserContext.js'
import Movies from '../Movies/Movies.jsx'
import SavedMovies from '../SavedMovies/SavedMovies.jsx'

export default function App () {
  const [currentUser, setCurrentUser] = React.useState({})
  const [isLogged, setIsLogged] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState(false)

  return (
    <div className='app'>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path='/'
            element={<Main isLogged={isLogged} isLoading={isLoading} />}
          />
          <Route
            path='/movies'
            element={<Movies isLogged={isLogged} isLoading={isLoading} />}
          />
          <Route
            path='/savedmovies'
            element={<SavedMovies isLogged={isLogged} isLoading={isLoading} />}
          />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  )
}
