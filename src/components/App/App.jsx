import './App.css'
import React from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import Main from '../Main/Main'
import CurrentUserContext from '../../contexts/CurrentUserContext.js'

export default function App () {
  const [currentUser, setCurrentUser] = React.useState({})
  const [isLogged, setIsLogged] = React.useState(false)

  return (
    <div className='app'>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path='/' element={<Main isLogged={isLogged} />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  )
}
