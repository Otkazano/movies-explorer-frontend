import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard.jsx'
import { testArrCards } from '../../vendor/testArrCards.js'
import { useResize } from '../../hooks/useResize'

export default function MoviesCardList ({ moviesSavedPage }) {
  const { isScreen845, isScreen989 } = useResize()
  return (
    <section className={`cardList ${moviesSavedPage ? 'cardList_saved' : ''}`}>
      <div
        className={`cardList__items ${
          testArrCards.length === 3 && testArrCards.length && isScreen989  ||
          testArrCards.length === 2 && testArrCards.length && isScreen845  ||
          testArrCards.length === 1 && testArrCards.length
            ? 'cardList__items_left'
            : ''
        }`}
      >
        {testArrCards.length ? (
          <>
            {testArrCards.map(item => (
              <MoviesCard
                item={item}
                key={item.id}
                moviesSavedPage={moviesSavedPage}
              />
            ))}
          </>
        ) : (
          <p className='cardList__error'>Фильмов не найдено</p>
        )}
      </div>
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
