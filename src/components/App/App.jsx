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
  const [apiMessage, setApiMessage] = React.useState('')

  const navigate = useNavigate()

  function auth (token) {
    authApi
      .getInfo(token)
      .then(res => {
        setIsLogged(true)
      })
      .catch(() => {
        navigate('/')
      })
  }

  function handleRegister ({ name, email, password }) {
    setIsLoading(true)
    return authApi
      .register(email, password, name)
      .then(res => {
        setApiMessage('')
        setIsLogged(true)
        localStorage.setItem('jwt', res.token)
        navigate('/movies')
      })
      .catch(err => {
        {
          err.message === 'Validation failed'
            ? setApiMessage('При регистрации пользователя произошла ошибка')
            : setApiMessage(err.message)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleLogin ({ email, password }) {
    setIsLoading(true)
    return authApi
      .authorize(email, password)
      .then(res => {
        setApiMessage('')
        setIsLogged(true)
        localStorage.setItem('jwt', res.token)
        navigate('/movies')
      })
      .catch(err => {
        {
          err.message === 'Validation failed'
            ? setApiMessage('Неправильные почта или пароль')
            : setApiMessage(err.message)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function onSignOut () {
    localStorage.clear()
    setIsLogged(false)
    setCurrentUser({
      name: '',
      email: ''
    })
    setApiMessage('')
  }

  function getUserInfo () {
    setIsLoading(true)
    mainApi.setAuthorizationHeader(localStorage.getItem('jwt'))
    return mainApi
      .getCurrentUser()
      .then(res => {
        setCurrentUser({
          name: res.name,
          email: res.email
        })
      })
      .catch(err => {
        {
          err.message === 'Validation failed'
            ? setApiMessage('Неправильные почта или имя')
            : setApiMessage(err.message)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleUpdateUserInfo ({ emailUser, nameUser }) {
    setIsLoading(true)
    mainApi.setAuthorizationHeader(localStorage.getItem('jwt'))
    return mainApi
      .changeUserInfo({emailUser, nameUser})
      .then(res => {
        setCurrentUser({
          name: res.name,
          email: res.email
        })
        setApiMessage('')
      })
      .catch(err => {
        console.log(err)
        setApiMessage(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
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
      value={{
        currentUser,
        isLoading,
        isLogged,
        movies,
        apiMessage,
        setApiMessage
      }}
    >
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route
          path='/profile'
          element={
            <Profile
              onSignOut={onSignOut}
              withOpen={getUserInfo}
              onUpdateUserInfo={handleUpdateUserInfo}
            />
          }
        />
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
