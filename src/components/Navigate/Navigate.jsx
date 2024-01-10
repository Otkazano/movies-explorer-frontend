import './Navigate.css'
import usePopupClose from '../../hooks/usePopupClose.js'
import { Link, useLocation } from 'react-router-dom'

export default function BurgerMenu ({ isOpened, onClose }) {
  usePopupClose(isOpened, onClose)
  const location = useLocation()

  return (
    <nav className={isOpened ? 'navigate navigate_opened' : 'navigate'}>
      <div className='navigate__container'>
        <button
          type='button'
          aria-label='Закрыть меню'
          onClick={onClose}
          className='navigate__buttonClose'
        ></button>
        <ul className='navigate__links'>
          <li className='navigate__links-el'>
            <Link
              to={'/'}
              className={`links-hover-style navigate__link ${
                location.pathname === '/' ? 'navigate__link-active' : ''
              }`}
            >
              Главная
            </Link>
          </li>
          <li className='navigate__links-el'>
            <Link
              to={'/movies'}
              className={`links-hover-style navigate__link ${
                location.pathname === '/movies' ? 'navigate__link-active' : ''
              }`}
            >
              Фильмы
            </Link>
          </li>
          <li className='navigate__links-el'>
            <Link
              to={'/saved-movies'}
              className={`links-hover-style navigate__link ${
                location.pathname === '/saved-movies'
                  ? 'navigate__link-active'
                  : ''
              }`}
            >
              Сохранённые фильмы
            </Link>
          </li>
        </ul>

        <Link
          to={'/profile'}
          className='buttons-hover-style navigate__buttonProfile'
        >
          <div className='navigate__buttonProfile-img' />
          Аккаунт
        </Link>
      </div>
    </nav>
  )
}
