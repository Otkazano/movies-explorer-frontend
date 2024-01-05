import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import Preloader from '../Preloader/Preloader'
import './Movies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList'

export default function Movies ({ isLogged, isLoading }) {
  return (
    <>
      <Header isLogged={isLogged} mainPage={false} />
      <SearchForm />
      <MoviesCardList moviesSavedPage={false} />
      <Footer />
      {isLoading && <Preloader />}
    </>
  )
}
