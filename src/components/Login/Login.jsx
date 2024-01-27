import AuthForm from '../AuthForm/AuthForm'
import './Login.css'
import React from 'react'
import GlobalContext from '../../contexts/GlobalContext'
import AuthInput from '../AuthInput/AuthInput'
import { Link } from 'react-router-dom'
import { useFormWithValidation } from '../../hooks/useFormWithValidation'
import Preloader from '../Preloader/Preloader'

export default function Login ({ onLogin }) {
  const { isLoading, apiMessage, setApiMessage } =
    React.useContext(GlobalContext)

  const { values, errors, isValid, handleChange } = useFormWithValidation()

  function handleSubmit (e) {
    e.preventDefault()
    onLogin({
      email: values.loginInputEmail,
      password: values.loginInputPassword
    })
  }

  React.useEffect(() => {
    setApiMessage('')
  }, [])

  return (
    <main className='login'>
      <Link to={'/'} className='login__link-logo'>
        <div className='login__logo buttons-hover-style' />
      </Link>
      <h1 className='login__header'>Рады видеть!</h1>
      <AuthForm
        idForm='loginForm'
        classForm='login__form'
        buttonText='Войти'
        onSubmit={handleSubmit}
        isValid={isValid}
        apiMessage={apiMessage}
      >
        <AuthInput
          value={values.loginInputEmail || ''}
          onChange={handleChange}
          idInput='loginInputEmail'
          typeInput='email'
          labelText='E-mail'
          required
          error={errors.loginInputEmail}
          pattern='^[\w]+@[a-zA-Z]+\.[a-zA-Z]{2,30}$'
        />
        <AuthInput
          value={values.loginInputPassword || ''}
          onChange={handleChange}
          idInput='loginInputPassword'
          typeInput='password'
          labelText='Пароль'
          required
          pattern='^[^\s]*$'
          minLength={2}
          maxLength={16}
          error={errors.loginInputPassword}
        />
      </AuthForm>
      <div className='login__info'>
        <span className='login__info-text'>Ещё не зарегистрированы?</span>
        <Link to={'/signup'} className='login__info-link links-hover-style'>
          Регистрация
        </Link>
      </div>
      {isLoading && <Preloader />}
    </main>
  )
}
