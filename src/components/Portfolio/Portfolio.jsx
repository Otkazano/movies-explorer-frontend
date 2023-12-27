import './Portfolio.css'

export default function Portfolio () {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__list'>
        <li className='portfolio__list-el'>
          <a
            href='https://otkazano.github.io/how-to-learn/'
            target='_blank'
            rel='noopener noreferrer'
            className='portfolio__link links-hover-style'
          >
            <p className='portfolio__link-name'>Статичный сайт</p>
            <p className='portfolio__link-arrow'>↗</p>
          </a>
        </li>
        <li className='portfolio__list-el'>
          <a
            href='https://otkazano.github.io/russian-travel/'
            className='portfolio__link links-hover-style'
            target='_blank'
            rel='noopener noreferrer'
          >
            <p className='portfolio__link-name'>Адаптивный сайт</p>
            <p className='portfolio__link-arrow'>↗</p>
          </a>
        </li>
        <li className='portfolio__list-el'>
          <a
            href='https://otkazano.github.io/react-mesto-auth'
            className='portfolio__link links-hover-style'
            target='_blank'
            rel='noopener noreferrer'
          >
            <p className='portfolio__link-name'>Одностраничное приложение</p>
            <p className='portfolio__link-arrow'>↗</p>
          </a>
        </li>
      </ul>
    </section>
  )
}
