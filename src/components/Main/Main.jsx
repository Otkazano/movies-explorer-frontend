import './Main.css'
import Promo from '../Promo/Promo'
import NavTab from '../NavTab/NavTab'
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs'
import AboutMe from '../AboutMe/AboutMe'
import Portfolio from '../Portfolio/Portfolio'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Preloader from '../Preloader/Preloader'

export default function Main ({ isLogged, isLoading }) {
  return (
    <>
      <Header isLogged={isLogged} mainPage={true} />
      <main className='main'>
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
      {isLoading && <Preloader />}
    </>
  )
}
