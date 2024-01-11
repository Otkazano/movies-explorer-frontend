import AuthForm from '../AuthForm/AuthForm'
import './Login.css'
import React from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import AuthInput from '../AuthInput/AuthInput'
import { Link } from 'react-router-dom'

export default function Login () {
  const { currentUser, isLoading, isLogged } =
    React.useContext(CurrentUserContext)

  const [emailInputLoginInfo, setEmailInputLoginInfo] = React.useState('')
  const [passwordInputLoginInfo, setPasswordInputLoginInfo] = React.useState('')

  function handleChangeEmailLoginInfo (e) {
    setEmailInputLoginInfo(e.target.value)
  }

  function handleChangePasswordLoginInfo (e) {
    setPasswordInputLoginInfo(e.target.value)
  }

  return (
    <main className='login'>
      <Link to={'/'}>
        <div className='login__logo buttons-hover-style' />
      </Link>
      <h1 className='login__header'>Рады видеть!</h1>
      <AuthForm
        idForm='loginForm'
        classForm='login__form'
        buttonText='Войти'
        onSubmit={() => {}}
      >
        <AuthInput
          value={emailInputLoginInfo}
          onChange={handleChangeEmailLoginInfo}
          idInput='loginInputEmail'
          typeInput='email'
          labelText='E-mail'
          required
        />
        <AuthInput
          value={passwordInputLoginInfo}
          onChange={handleChangePasswordLoginInfo}
          idInput='loginInputPassword'
          typeInput='password'
          labelText='Пароль'
          required
          minLength={4}
          maxLength={16}
        />
      </AuthForm>
      <div className='login__info'>
        <span className='login__info-text'>Ещё не зарегистрированы?</span>
        <Link to={'/signup'} className='login__info-link links-hover-style'>
          Регистрация
        </Link>
      </div>
    </main>
  )
}
