import React from 'react'
import Navigate from '../Navigate/Navigate'
import './Header.css'
import { Link } from 'react-router-dom'
import { useResize } from '../../hooks/useResize'

export default function Header ({ isLogged, mainPage }) {
  const [isOpened, setIsOpened] = React.useState(false)
  const { isScreen845 } = useResize()

  function openBurgerMenu () {
    setIsOpened(true)
  }

  function closeBurgerMenu () {
    setIsOpened(false)
  }

  return (
    <>
      <header
        className={mainPage ? 'header header_grey' : 'header header_white'}
      >
        <Link to={'/'}>
          <div className='header__logo links-hover-style' />
        </Link>

        <div
          className={
            isLogged && isScreen845
              ? 'header__buttons'
              : 'header__buttons header__buttons-end'
          }
        >
          {isLogged && isScreen845 && (
            <div className='header__links-movies'>
              <Link to={'/movies'} className='links-hover-style header__link'>
                Фильмы
              </Link>
              <Link to={'/savedmovies'} className='links-hover-style header__link'>
                Сохранённые фильмы
              </Link>
            </div>
          )}

          {isLogged ? (
            <>
              {isScreen845 ? (
                <Link
                  to={'/'}
                  className='buttons-hover-style header__button-profile'
                >
                  <div className='header__button-img' />
                  Аккаунт
                </Link>
              ) : (
                <button
                  className='buttons-hover-style header__burgerMenu'
                  onClick={openBurgerMenu}
                  aria-label='Открыть меню'
                ></button>
              )}
            </>
          ) : (
            <div className='header__links-profile'>
              <Link
                to={'/'}
                className='buttons-hover-style header__button-signUp'
              >
                Регистрация
              </Link>
              <Link
                to={'/'}
                className='buttons-hover-style header__button-signIn'
              >
                Войти
              </Link>
            </div>
          )}
        </div>
      </header>
      <Navigate isOpened={isOpened} onClose={closeBurgerMenu} />
    </>
  )
}
