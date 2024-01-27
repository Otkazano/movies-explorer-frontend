import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard.jsx'
import { useResize } from '../../hooks/useResize'
import React from 'react'
import GlobalContext from '../../contexts/GlobalContext'

export default function MoviesCardList ({ moviesSavedPage, movies, errorText }) {
  const { savedMovies } = React.useContext(GlobalContext)
  const { width, isScreen845, isScreen989, isScreen767 } = useResize()
  const [isMount, setIsMount] = React.useState(true)

  const [showList, setShowList] = React.useState([])
  const [cardsShowParams, setCardsShowParams] = React.useState({
    sum: 0,
    more: 0
  })

  React.useEffect(() => {
    if (width >= 1280) {
      setCardsShowParams({ sum: 8, more: 4 })
    } else if (width <= 1279 && width >= 990) {
      setCardsShowParams({ sum: 12, more: 3 })
    } else if (width <= 989 && width >= 768) {
      setCardsShowParams({ sum: 8, more: 2 })
    } else if (width <= 767) {
      setCardsShowParams({ sum: 5, more: 2 })
    }

    return () => setIsMount(false)
  }, [width, isMount])

  React.useEffect(() => {
    if (movies.length && !moviesSavedPage) {
      const res = movies.filter((item, index) => index < cardsShowParams.sum)
      setShowList(res)
    }
  }, [movies, moviesSavedPage, cardsShowParams.sum])

  React.useEffect(() => {
    if (moviesSavedPage) {
      setShowList(movies)
    }
  }, [movies, moviesSavedPage])

  function handleClickMoreMovies () {
    const start = showList.length
    const end = start + cardsShowParams.more
    const residual = movies.length - start

    if (residual > 0) {
      const newCards = movies.slice(start, end)
      setShowList([...showList, ...newCards])
    }
  }

  function getSavedMovieCard (arr, id) {
    return arr.find(item => {
      return item.movieId === id
    })
  }

  function setSavedCards () {
    return showList.map(item => {
      return (
        <li key={!moviesSavedPage ? item.id : item._id}>
          <MoviesCard item={{ ...item }} moviesSavedPage={moviesSavedPage} />
        </li>
      )
    })
  }

  function setCards () {
    return showList.map(item => {
      const savedMovieCard = getSavedMovieCard(savedMovies, item.id)
      const savedMovieId = savedMovieCard ? savedMovieCard._id : null
      return (
        <li key={!moviesSavedPage ? item.id : item._id}>
          <MoviesCard
            item={{ ...item, _id: savedMovieId }}
            moviesSavedPage={moviesSavedPage}
            isLiked={savedMovieCard ? true : false}
          />
        </li>
      )
    })
  }

  return (
    <section className={`cardList ${moviesSavedPage ? 'cardList_saved' : ''}`}>
      <h1 hidden={true}>Список фильмов</h1>

      {movies.length ? (
        <ul
          className={`cardList__items ${
            (showList.length === 3 && showList.length && isScreen989) ||
            (showList.length === 2 && showList.length && isScreen845) ||
            (showList.length === 1 && showList.length && !isScreen767)
              ? 'cardList__items_left'
              : ''
          }`}
        >
          {!moviesSavedPage ? setCards() : setSavedCards()}
        </ul>
      ) : (
        <p className='cardList__error'>{errorText}</p>
      )}

      {movies.length === 0 ||
        (showList.length !== movies.length && (
          <button
            type='button'
            className={`cardList__buttonMore buttons-hover-style ${
              moviesSavedPage ? 'cardList__buttonMore-none' : ''
            }`}
            onClick={handleClickMoreMovies}
          >
            Ещё
          </button>
        ))}
    </section>
  )
}
