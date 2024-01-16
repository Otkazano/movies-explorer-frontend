import './AuthForm.css'

export default function AuthForm ({
  idForm,
  classForm,
  buttonText,
  onSubmit,
  children,
  isValid,
  apiInfo
}) {
  return (
    <form
      action='#'
      id={idForm}
      className={`${classForm} authForm`}
      method='POST'
      name={idForm}
      onSubmit={onSubmit}
      noValidate
    >
      {children}

      <div className='authForm__box'>
        <span
          className={`authForm__apiInfo ${
            !apiInfo.status ? 'authForm__apiInfo-red' : 'authForm__apiInfo-green'
          }`}
        >
          {apiInfo.message}
        </span>
        <button
          className={`authForm__btn ${
            isValid ? 'buttons-hover-style' : 'authForm__btn-disabled'
          }`}
          type='submit'
          form={idForm}
          disabled={!isValid}
        >
          {buttonText}
        </button>
      </div>
    </form>
  )
}
