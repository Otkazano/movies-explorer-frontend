import './NavTab.css'

export default function NavTab () {
  return (
    <nav className='navTab'>
      <ul className='navTab__links'>
        <li className='navTab__links-el'>
          <a href='#aboutProject' className='navTab__link links-hover-style'>
            О проекте
          </a>
        </li>
        <li className='navTab__links-el'>
          <a href='#techs' className='navTab__link links-hover-style'>
            Технологии
          </a>
        </li>
        <li className='navTab__links-el'>
          <a href='#aboutMe' className='navTab__link links-hover-style'>
            Студент
          </a>
        </li>
      </ul>
    </nav>
  )
}
