import AuthForm from '../AuthForm/AuthForm'
import './Login.css'
import React from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import AuthInput from '../AuthInput/AuthInput'
import { Link } from 'react-router-dom'
import { useFormWithValidation } from '../../hooks/useFormWithValidation'

export default function Login () {
  const { currentUser, isLoading, isLogged } =
    React.useContext(CurrentUserContext)

  const { values, errors, isValid, handleChange } = useFormWithValidation()

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
        onSubmit={() => {}}
        isValid={isValid}
      >
        <AuthInput
          value={values.email}
          onChange={handleChange}
          idInput='loginInputEmail'
          typeInput='email'
          labelText='E-mail'
          required
          error={
            errors.loginInputEmail ? 'Неверный формат электронной почты.' : ''
          }
        />
        <AuthInput
          value={values.password}
          onChange={handleChange}
          idInput='loginInputPassword'
          typeInput='password'
          labelText='Пароль'
          required
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
    </main>
  )
}
