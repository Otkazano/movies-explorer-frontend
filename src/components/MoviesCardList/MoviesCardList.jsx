import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard.jsx'
import { testArrCards, testArrSavedCards } from '../../vendor/testArrCards.js'
import { useResize } from '../../hooks/useResize'

export default function MoviesCardList ({ moviesSavedPage }) {
  const { isScreen845 } = useResize()
  return (
    <section className={`cardList ${moviesSavedPage ? 'cardList_saved' : ''}`}>
      <div
        className={`cardList__items ${
          testArrSavedCards.length < 4 &&
          testArrSavedCards.length &&
          isScreen845
            ? 'cardList__items_left'
            : ''
        }`}
      >
        {testArrSavedCards.length ? (
          <>
            {testArrSavedCards.map(item => (
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
