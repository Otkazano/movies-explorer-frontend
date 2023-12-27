import './AboutMe.css'

export default function AboutMe () {
  return (
    <section className='aboutMe' id='aboutMe'>
      <h2 className='main__subtitle'>Студент</h2>
      <div className='aboutMe__cards'>
        <img src='https://cdnn21.img.ria.ru/images/92455/99/924559904_145:0:2422:1708_1920x0_80_0_0_6926c90cf66d8e4dca9bcad638e7099b.jpg' alt='Фото студента' className='aboutMe__photo' />
        <div className='aboutMe__texts'>
          <h3 className='aboutMe__name'>Виталий</h3>
          <p className='aboutMe__shortInfo'>Фронтенд-разработчик, 30 лет</p>
          <p className='aboutMe__info'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a href='https://github.com/Otkazano' className='aboutMe__link links-hover-style'>
            Github
          </a>
        </div>
      </div>
    </section>
  )
}
