import './Profile.css'
import CurrentUserContext from '../../contexts/CurrentUserContext.js'
import React from 'react'
import Header from '../Header/Header.jsx'
import AuthInput from '../AuthInput/AuthInput.jsx'

export default function Profile () {
  const { currentUser, isLoading, isLogged } =
    React.useContext(CurrentUserContext)

  const [userName, setUserName] = React.useState(currentUser.name)
  const [userEmail, setUserEmail] = React.useState(currentUser.email)
  const [editInfo, setEditInfo] = React.useState(false)

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

  React.useEffect(() => {
    if (editInfo) {
      const userNameInput = document.querySelector('#userNameInput')
      userNameInput.focus()
    }
  }, [editInfo])

  return (
    <>
      <Header isLogged={isLogged} mainPage={false} />
      <main className='profile'>
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
            />
          </label>

          <button
            className='profile__btn-save buttons-hover-style'
            hidden={!editInfo}
          >
            Сохранить
          </button>
        </form>
        <div className='profile__panel'>
          <button
            className='profile__panel-btn profile__panel-btnEdit buttons-hover-style'
            onClick={editInfoHandler}
            hidden={editInfo}
          >
            Редактировать
          </button>
          <button
            className='profile__panel-btn profile__panel-btnExit buttons-hover-style'
            hidden={editInfo}
          >
            Выйти из аккаунта
          </button>
        </div>
      </main>
    </>
  )
}
