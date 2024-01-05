import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Preloader from '../Preloader/Preloader'
import SearchForm from '../SearchForm/SearchForm'
import './SavedMovies.css'

export default function SavedMovies ({ isLogged, isLoading }) {
  return (
    <>
      <Header isLogged={isLogged} mainPage={false} />
      <SearchForm />
      <MoviesCardList moviesSavedPage={true} />
      <Footer />
      {isLoading && <Preloader />}
    </>
  )
}
