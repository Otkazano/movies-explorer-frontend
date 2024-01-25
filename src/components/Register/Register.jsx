import './Register.css'
import AuthForm from '../AuthForm/AuthForm'
import React from 'react'
import GlobalContext from '../../contexts/GlobalContext'
import AuthInput from '../AuthInput/AuthInput'
import { Link } from 'react-router-dom'
import { useFormWithValidation } from '../../hooks/useFormWithValidation'
import Preloader from '../Preloader/Preloader'

export default function Register ({ onRegister }) {
  const { currentUser, isLoading, isLogged, apiMessage, setApiMessage } =
    React.useContext(GlobalContext)

  const { values, errors, isValid, handleChange } = useFormWithValidation()

  function handleSubmit (e) {
    e.preventDefault()
    onRegister({
      name: values.registerInputName,
      email: values.registerInputEmail,
      password: values.registerInputPassword
    })
  }

  React.useEffect(() => {
    setApiMessage('')
  }, [])

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
        apiMessage={apiMessage}
      >
        <AuthInput
          value={values.registerInputName || ''}
          onChange={handleChange}
          idInput='registerInputName'
          typeInput='text'
          labelText='Имя'
          required
          minLength={2}
          maxLength={30}
          pattern='^[^\s][A-Za-zА-Яа-яЁё - \s]+$'
          error={
            errors.registerInputName === 'Введите данные в указанном формате.'
              ? `Поле должно быть заполнено и может содержать только латиницу,
                кириллицу, пробел или дефис`
              : errors.registerInputName
          }
        />
        <AuthInput
          value={values.registerInputEmail || ''}
          onChange={handleChange}
          idInput='registerInputEmail'
          typeInput='email'
          labelText='E-mail'
          required
          pattern='^[^\s][\w]+@[a-zA-Z]+\.[a-zA-Z]{2,30}$'
          error={errors.registerInputEmail}
        />
        <AuthInput
          value={values.registerInputPassword || ''}
          onChange={handleChange}
          idInput='registerInputPassword'
          typeInput='password'
          labelText='Пароль'
          required
          pattern='^[^\s]*$'
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
      {isLoading && <Preloader />}
    </main>
  )
}
