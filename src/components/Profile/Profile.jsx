import './Profile.css'
import CurrentUserContext from '../../contexts/CurrentUserContext.js'
import React from 'react'
import Header from '../Header/Header.jsx'
import AuthInput from '../AuthInput/AuthInput.jsx'
import { useNavigate } from 'react-router-dom'

export default function Profile () {
  const { currentUser, isLoading, isLogged } =
    React.useContext(CurrentUserContext)

  const [userName, setUserName] = React.useState(currentUser.name)
  const [userEmail, setUserEmail] = React.useState(currentUser.email)
  const [editInfo, setEditInfo] = React.useState(false)
  const navigate = useNavigate()

  function editInfoHandler (e) {
    e.preventDefault()
    setEditInfo(true)
  }

  function handleChangeUserName (e) {
    setUserName(e.target.value)
  }

  function handleChangeUserEmail (e) {
    setUserEmail(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()
    setEditInfo(false)
  }

  function handlerClickExitFromAccount (e) {
    e.preventDefault()
    navigate('/')
  }

  React.useEffect(() => {
    if (editInfo) {
      const userNameInput = document.querySelector('#userNameInput')
      userNameInput.focus()
    }
  }, [editInfo])

  return (
    <>
      <Header isLogged={isLogged} mainPage={false} />
      <main className='main'>
        <section className='profile'>
          <h3 className='profile__title'>Привет, {currentUser.name}!</h3>
          <form
            action='#'
            id='profileForm'
            className='profile__form'
            method='POST'
            name='profileForm'
            onSubmit={handleSubmit}
          >
            <label className='profile__box'>
              <span className='profile__input-text'>Имя</span>
              <input
                type='text'
                id='userNameInput'
                className='profile__input'
                autoComplete='off'
                value={userName}
                onChange={handleChangeUserName}
                disabled={!editInfo}
                placeholder=' '
                minLength={2}
                maxLength={30}
                required
              />
            </label>
            <label className='profile__box'>
              <span className='profile__input-text'>E-mail</span>
              <input
                type='text'
                id='userEmailInput'
                className='profile__input'
                autoComplete='off'
                value={userEmail}
                onChange={handleChangeUserEmail}
                disabled={!editInfo}
                placeholder=' '
                required
              />
            </label>

            <button
              className='profile__btn-save buttons-hover-style'
              hidden={!editInfo}
              type='submit'
              form='profileForm'
            >
              Сохранить
            </button>
          </form>
          <div className='profile__panel'>
            <button
              className='profile__panel-btn profile__panel-btnEdit buttons-hover-style'
              onClick={editInfoHandler}
              hidden={editInfo}
              type='button'
            >
              Редактировать
            </button>
            <button
              className='profile__panel-btn profile__panel-btnExit buttons-hover-style'
              hidden={editInfo}
              onClick={handlerClickExitFromAccount}
              type='button'
            >
              Выйти из аккаунта
            </button>
          </div>
        </section>
      </main>
    </>
  )
}
