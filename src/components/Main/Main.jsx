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
import React from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'

export default function Main () {
  const { currentUser, isLoading, isLogged } =
    React.useContext(CurrentUserContext)
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
