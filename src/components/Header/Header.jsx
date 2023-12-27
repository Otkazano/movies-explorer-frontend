import './Header.css'
import { Link } from 'react-router-dom'

export default function Header ({ isLogged, mainPage }) {
  return (
    <header className={mainPage ? 'header header_grey' : 'header header_white'}>
      <Link to={'/'}>
        <div className='header__logo links-hover-style' />
      </Link>
      <div
        className={
          isLogged ? 'header__buttons' : 'header__buttons header__buttons-end'
        }
      >
        {isLogged && (
          <div className='header__links-movies'>
            <Link to={'/'} className='links-hover-style header__link'>
              Фильмы
            </Link>
            <Link to={'/'} className='links-hover-style header__link'>
              Сохранённые фильмы
            </Link>
          </div>
        )}
        {isLogged ? (
          <Link to={'/'} className='buttons-hover-style header__button-profile'>
            <div className='header__button-img' />
            Аккаунт
          </Link>
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
  )
}
