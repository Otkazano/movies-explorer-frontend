import './Footer.css'

export default function Footer () {
  return (
    <footer className='footer'>
      <p className='footer__text'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className='footer__info'>
        <p className='footer__copyright'>&copy; 2024 Vladimir&nbsp;Strugov</p>
        <ul className='footer__list'>
          <li className='footer__list-el'>
            <a
              href='https://practicum.yandex.ru/'
              className='footer__link links-hover-style'
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className='footer__list-el'>
            <a
              href='https://github.com/Otkazano'
              className='footer__link links-hover-style'
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
