import './Navigate.css'
import usePopupClose from '../../hooks/usePopupClose.js'
import { Link } from 'react-router-dom'
export default function BurgerMenu ({ isOpened, onClose }) {
  usePopupClose(isOpened, onClose)
  return (
    <nav
      className={isOpened ? 'navigate navigate_opened' : 'navigate'}
    >
      <div className='navigate__container'>
        <button
          type='button'
          aria-label='Закрыть меню'
          onClick={onClose}
          className='navigate__buttonClose buttons-hover-style'
        ></button>
        <ul className='navigate__links'>
          <li className='navigate__links-el'>
            <Link to={'/'} className='links-hover-style navigate__link'>
              Главная
            </Link>
          </li>
          <li className='navigate__links-el'>
            <Link to={'/'} className='links-hover-style navigate__link'>
              Фильмы
            </Link>
          </li>
          <li className='navigate__links-el'>
            <Link to={'/'} className='links-hover-style navigate__link'>
              Сохранённые фильмы
            </Link>
          </li>
        </ul>

        <Link
          to={'/'}
          className='buttons-hover-style navigate__buttonProfile'
        >
          <div className='navigate__buttonProfile-img' />
          Аккаунт
        </Link>
      </div>
    </nav>
  )
}
