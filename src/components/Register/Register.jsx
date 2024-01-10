import './Register.css'
import AuthForm from '../AuthForm/AuthForm'
import React from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import AuthInput from '../AuthInput/AuthInput'
import { Link } from 'react-router-dom'

export default function Register () {
  const { currentUser, isLoading, isLogged } =
    React.useContext(CurrentUserContext)

    
  const [nameInputRegisterInfo, setNameInputRegisterInfo] = React.useState('')
  const [emailInputRegisterInfo, setEmailInputRegisterInfo] = React.useState('')
  const [passwordInputRegisterInfo, setPasswordInputRegisterInfo] = React.useState('')
  
  function handleChangeNameRegisterInfo (e) {
    setNameInputRegisterInfo(e.target.value)
  }

  function handleChangeEmailRegisterInfo (e) {
    setEmailInputRegisterInfo(e.target.value)
  }

  function handleChangePasswordRegisterInfo (e) {
    setPasswordInputRegisterInfo(e.target.value)
  }

  return (
    <main className='register'>
      <Link to={'/'}>
        <div className='register__logo buttons-hover-style' />
      </Link>
      <h2 className='register__header'>Добро пожаловать!</h2>
      <AuthForm
        idForm='registerForm'
        classForm='register__form'
        buttonText='Зарегистрироваться'
        onSubmit={() => {}}
      >
        <AuthInput
          value={nameInputRegisterInfo}
          onChange={handleChangeNameRegisterInfo}
          idInput='registerInputName'
          typeInput='text'
          labelText='Имя'
        />
        <AuthInput
          value={emailInputRegisterInfo}
          onChange={handleChangeEmailRegisterInfo}
          idInput='registerInputEmail'
          typeInput='email'
          labelText='E-mail'
        />
        <AuthInput
          value={passwordInputRegisterInfo}
          onChange={handleChangePasswordRegisterInfo}
          idInput='registerInputPassword'
          typeInput='password'
          labelText='Пароль'
        />
      </AuthForm>
      <div className='register__info'>
        <span className='register__info-text'>Уже зарегистрированы?</span>
        <Link to={'/signin'} className='register__info-link links-hover-style'>
          Войти
        </Link>
      </div>
    </main>
  )
}
