import React from 'react'
import Navigate from '../Navigate/Navigate'
import './Header.css'
import { Link, useLocation } from 'react-router-dom'
import { useResize } from '../../hooks/useResize'

export default function Header ({ isLogged, mainPage }) {
  const [isOpened, setIsOpened] = React.useState(false)
  const { isScreen845 } = useResize()
  const location = useLocation()

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
              <Link
                to={'/movies'}
                className={`links-hover-style header__link ${
                  location.pathname === '/movies' ? 'header__link-active' : ''
                }`}
              >
                Фильмы
              </Link>
              <Link
                to={'/saved-movies'}
                className={`links-hover-style header__link ${
                  location.pathname === '/saved-movies'
                    ? 'header__link-active'
                    : ''
                }`}
              >
                Сохранённые фильмы
              </Link>
            </div>
          )}

          {isLogged ? (
            <>
              {isScreen845 ? (
                <Link
                  to={'/profile'}
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
                  type='button'
                ></button>
              )}
            </>
          ) : (
            <nav className='header__links-profile'>
              <Link
                to={'/signup'}
                className='buttons-hover-style header__button-signUp'
              >
                Регистрация
              </Link>
              <Link
                to={'/signin'}
                className='buttons-hover-style header__button-signIn'
              >
                Войти
              </Link>
            </nav>
          )}
        </div>
      </header>
      <Navigate isOpened={isOpened} onClose={closeBurgerMenu} />
    </>
  )
}
