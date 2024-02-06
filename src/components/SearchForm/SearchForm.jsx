import React from 'react'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import './SearchForm.css'

export default function SearchForm ({
  searchQuery,
  handleChangeSearchQuery,
  checkedFilter,
  handleChangeCheckedFilter,
  onSubmit
}) {
  function handleSubmit (e) {
    e.preventDefault()
    onSubmit()
  }

  return (
    <section className='searchForm'>
      <h2 hidden={true}>Форма поиска фильмов</h2>
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
            placeholder='Фильмы'
            autoComplete='off'
            value={searchQuery}
            onChange={handleChangeSearchQuery}
            required
          />
          <button
            type='submit'
            form='searchForm'
            className='searchForm__button buttons-hover-style'
            aria-label='Найти фильм'
          />
        </div>
        <div className='searchForm__filter'>
          <FilterCheckbox
            checked={checkedFilter}
            handleChange={handleChangeCheckedFilter}
          />
          <label className='searchForm__filter-text' htmlFor='filterCheckbox'>
            Короткометражки
          </label>
        </div>
      </form>
    </section>
  )
}
