import React from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Preloader from '../Preloader/Preloader'
import SearchForm from '../SearchForm/SearchForm'
import './SavedMovies.css'
import CurrentUserContext from '../../contexts/CurrentUserContext'

export default function SavedMovies () {
  const { currentUser, isLoading, isLogged, movies } =
    React.useContext(CurrentUserContext)
  return (
    <>
      <Header isLogged={isLogged} mainPage={false} />
      <main>
        <SearchForm />
        <MoviesCardList moviesSavedPage={true} movies={movies} />
      </main>
      <Footer />
      {isLoading && <Preloader />}
    </>
  )
}
