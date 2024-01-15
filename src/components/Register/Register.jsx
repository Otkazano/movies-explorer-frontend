import './Register.css'
import AuthForm from '../AuthForm/AuthForm'
import React from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import AuthInput from '../AuthInput/AuthInput'
import { Link } from 'react-router-dom'
import { useFormWithValidation } from '../../hooks/useFormWithValidation'

export default function Register ({ onRegister }) {
  const { currentUser, isLoading, isLogged } =
    React.useContext(CurrentUserContext)

  const { values, errors, isValid, handleChange } = useFormWithValidation()

  function handleSubmit (e) {
    e.preventDefault()
    onRegister({
      name: values.name,
      email: values.email,
      password: values.password
    })
  }

  return (
    <main className='register'>
      <Link to={'/'} className='register__link-logo'>
        <div className='register__logo buttons-hover-style' />
      </Link>
      <h1 className='register__header'>Добро пожаловать!</h1>
      <AuthForm
        idForm='registerForm'
        classForm='register__form'
        buttonText='Зарегистрироваться'
        onSubmit={handleSubmit}
        isValid={isValid}
      >
        <AuthInput
          value={values.name}
          onChange={handleChange}
          idInput='registerInputName'
          typeInput='text'
          labelText='Имя'
          required
          minLength={2}
          maxLength={30}
          pattern='^[A-Za-zА-Яа-яЁё - \s]+$'
          error={
            errors.registerInputName === 'Введите данные в указанном формате.'
              ? `Поле должно быть заполнено и может содержать только латиницу,
                кириллицу, пробел или дефис`
              : errors.registerInputName
          }
        />
        <AuthInput
          value={values.email}
          onChange={handleChange}
          idInput='registerInputEmail'
          typeInput='email'
          labelText='E-mail'
          required
          error={errors.registerInputEmail}
        />
        <AuthInput
          value={values.password}
          onChange={handleChange}
          idInput='registerInputPassword'
          typeInput='password'
          labelText='Пароль'
          required
          minLength={2}
          maxLength={16}
          error={errors.registerInputPassword}
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
