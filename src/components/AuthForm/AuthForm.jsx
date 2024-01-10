import './AuthForm.css'

export default function AuthForm ({
  idForm,
  classForm,
  buttonText,
  onSubmit,
  children
}) {
  function handleSubmit (e) {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form
      action='#'
      id={idForm}
      className={`${classForm} authForm`}
      method='POST'
      name={idForm}
      onSubmit={handleSubmit}
    >
      {children}
      <button className='authForm__btn buttons-hover-style'>{buttonText}</button>
    </form>
  )
}
