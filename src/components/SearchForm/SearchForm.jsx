import React from 'react'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import './SearchForm.css'

export default function SearchForm () {
  const [movieName, setMovieName] = React.useState('')

  function handleChangeMovieName (e) {
    setMovieName(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()
  }
  return (
    <section className='searchForm'>
      <form
        action='#'
        id='searchForm'
        className='searchForm__form'
        method='POST'
        name='searchForm'
        onSubmit={handleSubmit}
      >
        <div className='searchForm__box'>
          <input
            type='text'
            id='inputMovie'
            className='searchForm__input'
            placeholder=' '
            autoComplete='off'
            value={movieName}
            onChange={handleChangeMovieName}
          />
          <button
            type='submit'
            form='searchForm'
            className='searchForm__button buttons-hover-style'
            aria-label='Найти фильм'
          />
        </div>
        <label className='searchForm__filter'>
          <FilterCheckbox />
          <span className='searchForm__filter-text'>Короткометражки</span>
        </label>
      </form>
    </section>
  )
}
