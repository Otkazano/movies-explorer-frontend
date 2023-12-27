import './Techs.css'

export default function Techs () {
  return (
    <section className='techs' id='techs'>
      <h2 className='main__subtitle'>Технологии</h2>
      <h3 className='techs__title'>7 технологий</h3>
      <p className='techs__text'>
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className='techs__list'>
        <li className='techs__list-el'>HTML</li>
        <li className='techs__list-el'>CSS</li>
        <li className='techs__list-el'>JS</li>
        <li className='techs__list-el'>React</li>
        <li className='techs__list-el'>Git</li>
        <li className='techs__list-el'>Express.js</li>
        <li className='techs__list-el'>mongoDB</li>
      </ul>
    </section>
  )
}
