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
import movieApi from '../../utils/MoviesApi.js'
import authApi from '../../utils/Auth.js'
import mainApi from '../../utils/MainApi.js'

export default function App () {
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    email: ''
  })
  const [isLogged, setIsLogged] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [movies, setMovies] = React.useState([])

  const navigate = useNavigate()

  function auth (token) {
    mainApi
      .setAuthorizationHeader(token)
      .then(() => {
        mainApi.getCurrentUser
          .then(() => {
            localStorage.setItem('isLogged', JSON.stringify(true))
            setIsLogged(true)
            navigate('/movies')
          })
          .catch(() => {
            localStorage.setItem('loggedIn', JSON.stringify(false))
          })
      })
      .catch(() => {
        localStorage.setItem('loggedIn', JSON.stringify(false))
      })
  }

  function handleRegister ({ name, email, password }) {
    setIsLoading(true)
    return authApi
      .register(email, password, name)
      .then(() => {
        navigate('/movies')
      })
      .catch(err => {
        console.log('ошибка регистрации', err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleLogin ({ email, password }) {
    localStorage.setItem('email', email)
    setIsLoading(true)
    return authApi
      .authorize(email, password)
      .then(res => {
        if (res.token) {
          setIsLogged(true)
          localStorage.setItem('jwt', res.token)
          localStorage.setItem('loggedIn', JSON.stringify(true))
          navigate('/movies')
        }
      })
      .catch(err => {
        console.log('ошибка входа', err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function onSignOut () {
    localStorage.clear()
    setIsLogged(false)
  }

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const token = localStorage.getItem('jwt')
      auth(token)
    }
  }, [])

  React.useEffect(() => {
    Promise.all([movieApi.getAllMovies()])
      .then(([list]) => {
        setMovies(list)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, isLoading, isLogged, movies }}
    >
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='/profile' element={<Profile onSignOut={onSignOut} />} />
        <Route path='/signin' element={<Login onLogin={handleLogin} />} />
        <Route
          path='/signup'
          element={<Register onRegister={handleRegister} />}
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  )
}
