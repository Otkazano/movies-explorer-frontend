import './AboutProject.css'

export default function AboutProject () {
  return (
    <section className='aboutProject' id='aboutProject'>
      <h2 className='main__subtitle'>О проекте</h2>
      <div className='aboutProject__textBox'>
        <p className='aboutProject__text-title'>
          Дипломный проект включал 5 этапов
        </p>
        <p className='aboutProject__text-title'>
          На выполнение диплома ушло 5 недель
        </p>
        <p className='aboutProject__text-info'>
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
        <p className='aboutProject__text-info'>
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className='aboutProject__timeBox'>
        <p className='aboutProject__time-weeks'>1 неделя</p>
        <p className='aboutProject__time-weeks'>4 недели</p>
        <p className='aboutProject__time-info'>Back-end</p>
        <p className='aboutProject__time-info'>Front-end</p>
      </div>
    </section>
  )
}
