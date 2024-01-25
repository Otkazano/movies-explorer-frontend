import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import Preloader from '../Preloader/Preloader'
import './Movies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import React from 'react'
import GlobalContext from '../../contexts/GlobalContext'
import movieApi from '../../utils/MoviesApi'

export default function Movies () {
  const { isLoading, isLogged, setIsLoading } = React.useContext(GlobalContext)

  const [searchQuery, setSearchQuery] = React.useState('')
  const [checkedFilterShortFilms, setCheckedFilterShortFilms] =
    React.useState(false)

  const [allMovies, setAllMovies] = React.useState([])

  const [filteredMovies, setFilteredMovies] = React.useState([])
  const [filteredShortMovies, setFilteredShortMovies] = React.useState([])

  const [movies, setMovies] = React.useState([])

  const [errorText, setErrorText] = React.useState(
    'Сделайте свой первый поиск!'
  )

  function handleSetMovies (movies) {
    if (movies.length === 0) {
      setErrorText('Ничего не найдено')
    }
    setMovies(movies)
    localStorage.setItem('movies', JSON.stringify(movies))
  }

  function handleChangeCheckedFilter (e) {
    setCheckedFilterShortFilms(e)
    localStorage.setItem('shortFilms', e)
    if (!checkedFilterShortFilms) {
      handleSetMovies(filteredShortMovies)
    } else {
      handleSetMovies(filteredMovies)
    }
  }
  function handleChangeSearchQuery (e) {
    setSearchQuery(e.target.value)
  }

  function filterShortMovies (movies) {
    return movies.filter(movie => movie.duration < 40)
  }

  function filterMovies (arrMovies, searchQuery, shortFilms) {
    const moviesByQuery = arrMovies.filter(movie => {
      const nameRu = movie.nameRU.toLowerCase()
      const nameEn = movie.nameEN.toLowerCase()
      const searchName = searchQuery.toLowerCase().trim()
      return (
        nameRu.indexOf(searchName) !== -1 || nameEn.indexOf(searchName) !== -1
      )
    })

    const films = filterShortMovies(moviesByQuery)
    setFilteredShortMovies(films)

    if (shortFilms) {
      return films
    }

    setFilteredMovies(moviesByQuery)
    return moviesByQuery
  }

  function handleSetFilteredMovies (arrMovies, query, checkbox) {
    const filteredMovies = filterMovies(arrMovies, query, checkbox)
    handleSetMovies(filteredMovies)
  }

  function handleSearchSubmit () {
    setIsLoading(true)
    localStorage.setItem('searchQuery', searchQuery)
    localStorage.setItem('shortFilms', checkedFilterShortFilms)

    if (!allMovies.length) {
      movieApi
        .getAllMovies()
        .then(res => {
          setAllMovies(res)
          handleSetFilteredMovies(res, searchQuery, checkedFilterShortFilms)
        })
        .catch(err => {
          setErrorText('Произошла ошибка при поиске')
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      handleSetFilteredMovies(allMovies, searchQuery, checkedFilterShortFilms)
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    if (localStorage.getItem('movies')) {
      setCheckedFilterShortFilms(JSON.parse(localStorage.getItem('shortFilms')))
      setSearchQuery(localStorage.getItem('searchQuery'))
      const arrMovies = JSON.parse(localStorage.getItem('movies'))
      handleSetFilteredMovies(arrMovies, searchQuery, checkedFilterShortFilms)
    }
  }, [])

  return (
    <>
      <Header isLogged={isLogged} mainPage={false} />
      <main className='moviesPage'>
        <SearchForm
          searchQuery={searchQuery}
          handleChangeSearchQuery={handleChangeSearchQuery}
          checkedFilter={checkedFilterShortFilms}
          handleChangeCheckedFilter={handleChangeCheckedFilter}
          onSubmit={handleSearchSubmit}
        />
        <MoviesCardList
          moviesSavedPage={false}
          movies={movies}
          errorText={errorText}
        />
      </main>
      <Footer />
      {isLoading && <Preloader />}
    </>
  )
}
