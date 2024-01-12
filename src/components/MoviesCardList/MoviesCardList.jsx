import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard.jsx'
import { useResize } from '../../hooks/useResize'

export default function MoviesCardList ({ moviesSavedPage, movies }) {
  const { isScreen845, isScreen989 } = useResize()
  return (
    <section className={`cardList ${moviesSavedPage ? 'cardList_saved' : ''}`}>
      <h1 hidden={true}>Список фильмов</h1>
      <ul
        className={`cardList__items ${
          (movies.length === 3 && movies.length && isScreen989) ||
          (movies.length === 2 && movies.length && isScreen845) ||
          (movies.length === 1 && movies.length)
            ? 'cardList__items_left'
            : ''
        }`}
      >
        {movies.length ? (
          <>
            {movies.map(item => (
              <li key={item.id}>
                <MoviesCard
                  item={item}
                  
                  moviesSavedPage={moviesSavedPage}
                />
              </li>
            ))}
          </>
        ) : (
          <p className='cardList__error'>Фильмов не найдено</p>
        )}
      </ul>
      <button
        type='button'
        className={`cardList__buttonMore buttons-hover-style ${
          moviesSavedPage ? 'cardList__buttonMore-none' : ''
        }`}
      >
        Ещё
      </button>
    </section>
  )
}
