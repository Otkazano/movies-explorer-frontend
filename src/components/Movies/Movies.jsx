import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import Preloader from '../Preloader/Preloader'
import './Movies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import React from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'

export default function Movies () {
  const { currentUser, isLoading, isLogged } =
    React.useContext(CurrentUserContext)
  return (
    <>
      <Header isLogged={isLogged} mainPage={false} />
      <main>
        <SearchForm />
        <MoviesCardList moviesSavedPage={false} />
      </main>
      <Footer />
      {isLoading && <Preloader />}
    </>
  )
}
