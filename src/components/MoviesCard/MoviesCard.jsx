import React from 'react'
import './MoviesCard.css'

export default function MoviesCard ({ item, moviesSavedPage }) {
  const [liked, setLiked] = React.useState(false)

  function likeCard () {
    !liked ? setLiked(true) : setLiked(false)
  }

  function durationInHours (mins) {
    const hours = Math.trunc(mins / 60)
    const minutes = mins % 60
    return `${hours}ч ${minutes}м`
  }

  return (
    <article className='card'>
      <a
        href={item.trailerLink}
        className='card__link links-hover-style'
        target='_blank'
        rel='noopener noreferrer'
      >
        <img
          src={`https://api.nomoreparties.co${item.image.url}`}
          alt='постер фильма'
          className='card__img'
        />
      </a>
      <div className='card__box'>
        <div className='card__info'>
          <h2 className='card__name'>{item.nameRU}</h2>
          <p className='card__duration'>{durationInHours(item.duration)}</p>
        </div>
        {!moviesSavedPage ? (
          <button
            className={`buttons-hover-style card__button card__buttonLike ${
              liked && 'card__buttonLike_active'
            }`}
            onClick={likeCard}
            type='button'
          ></button>
        ) : (
          <button
            className='buttons-hover-style card__button card__buttonDelete'
            type='button'
          ></button>
        )}
      </div>
    </article>
  )
}
