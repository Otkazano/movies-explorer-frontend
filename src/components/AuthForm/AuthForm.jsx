import './AuthForm.css'

export default function AuthForm ({
  idForm,
  classForm,
  buttonText,
  onSubmit,
  children,
  isValid
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
    </form>
  )
}
