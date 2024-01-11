import './App.css'
import React from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import Main from '../Main/Main'
import CurrentUserContext from '../../contexts/CurrentUserContext.js'
import Movies from '../Movies/Movies.jsx'
import SavedMovies from '../SavedMovies/SavedMovies.jsx'
import NotFound from '../NotFound/NotDound.jsx'
import Profile from '../Profile/Profile.jsx'
import Login from '../Login/Login.jsx'
import Register from '../Register/Register.jsx'

export default function App () {
  const [currentUser, setCurrentUser] = React.useState({
    name: 'Виталий',
    email: 'pochta@yandex.ru'
  })
  const [isLogged, setIsLogged] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoading, isLogged }}>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  )
}
