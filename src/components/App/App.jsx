import './App.css'
import React from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import Main from '../Main/Main'
import GlobalContext from '../../contexts/GlobalContext.js'
import Movies from '../Movies/Movies.jsx'
import SavedMovies from '../SavedMovies/SavedMovies.jsx'
import NotFound from '../NotFound/NotDound.jsx'
import Profile from '../Profile/Profile.jsx'
import Login from '../Login/Login.jsx'
import Register from '../Register/Register.jsx'
import authApi from '../../utils/Auth.js'
import mainApi from '../../utils/MainApi.js'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx'

export default function App () {
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    email: ''
  })
  const [isLogged, setIsLogged] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [apiMessage, setApiMessage] = React.useState('')
  const [savedMovies, setSavedMovies] = React.useState([])

  const navigate = useNavigate()

  function auth (token) {
    authApi
      .getInfo(token)
      .then(() => {
        setIsLogged(true)
        localStorage.setItem('Logged', true)
      })
      .catch(() => {
        localStorage.setItem('Logged', JSON.stringify(false))
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
        localStorage.setItem('Logged', true)
        navigate('/movies')
        getUserInfo()
      })
      .catch(err => {
        err.message === 'Validation failed'
          ? setApiMessage('При регистрации пользователя произошла ошибка')
          : setApiMessage(err.message)
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
        localStorage.setItem('Logged', true)
        navigate('/movies')
        getUserInfo()
        mainApi
          .getSavedMovies()
          .then(res => {
            setSavedMovies(res)
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        err.message === 'Validation failed'
          ? setApiMessage('Неправильные почта или пароль')
          : setApiMessage(err.message)
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
    setSavedMovies([])
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
        err.message === 'Validation failed'
          ? setApiMessage('Неправильные почта или имя')
          : setApiMessage(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleUpdateUserInfo ({ emailUser, nameUser }) {
    setIsLoading(true)
    mainApi.setAuthorizationHeader(localStorage.getItem('jwt'))
    return mainApi
      .changeUserInfo({ emailUser, nameUser })
      .then(res => {
        setCurrentUser({
          name: res.name,
          email: res.email
        })
        setApiMessage('Вы успешно изменили данные аккаунта!')
      })
      .catch(err => {
        setApiMessage(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleSaveMovie (movie) {
    setIsLoading(true)
    mainApi
      .saveNewMovie(movie)
      .then(newCard => {
        setSavedMovies([newCard, ...savedMovies])
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleDeleteMovie (movie) {
    setIsLoading(true)
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        const newMoviesList = savedMovies.filter(m =>
          m._id === movie._id ? false : true
        )
        setSavedMovies(newMoviesList)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
  }

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const token = localStorage.getItem('jwt')
      auth(token)
      mainApi
        .getSavedMovies()
        .then(res => {
          setSavedMovies(res)
          getUserInfo()
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {})
    }
  }, [])

  function blockDoubleRequest (e) {
    if (e.keyCode == 13) {
      e.preventDefault()
    }
    if (e.keyCode == 32) {
      e.preventDefault()
    }
  }

  React.useEffect(() => {
    if (isLoading) {
      window.addEventListener('keydown', blockDoubleRequest)
    }

    return () => {
      window.removeEventListener('keydown', blockDoubleRequest)
    }
  }, [isLoading])

  return (
    <GlobalContext.Provider
      value={{
        currentUser,
        isLoading,
        isLogged,
        apiMessage,
        savedMovies,
        setApiMessage,
        setIsLoading,
        handleSaveMovie,
        handleDeleteMovie
      }}
    >
      <Routes>
        <Route path='/' element={<Main />} />
        <Route
          path='/movies'
          element={
            <ProtectedRoute>
              <Movies />
            </ProtectedRoute>
          }
        />
        <Route
          path='/saved-movies'
          element={
            <ProtectedRoute path='/saved-movies'>
              <SavedMovies movies={savedMovies} />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile
                onSignOut={onSignOut}
                onUpdateUserInfo={handleUpdateUserInfo}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path='/signin'
          element={
            isLogged ? (
              <Navigate to='/' replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path='/signup'
          element={
            isLogged ? (
              <Navigate to='/' replace />
            ) : (
              <Register onRegister={handleRegister} />
            )
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </GlobalContext.Provider>
  )
}
