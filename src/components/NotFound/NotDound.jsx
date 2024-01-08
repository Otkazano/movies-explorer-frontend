import './NotFound.css'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFound () {
  const navigate = useNavigate()
  return (
    <section className='notFound'>
      <h3 className='notFound__title'>404</h3>
      <p className='notFound__text'>Страница не найдена</p>
      <button
        type='button'
        className='notFound__button buttons-hover-style'
        onClick={() => {
          navigate(-1)
        }}
      >
        Назад
      </button>
    </section>
  )
}
