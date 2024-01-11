import './AuthInput.css'

export default function AuthInput ({ idInput, typeInput, labelText, ...props }) {
  return (
    <div className='authInput'>
      <label className='authInput__text' htmlFor={idInput}>
        {labelText}
      </label>
      <input type={typeInput} id={idInput} className='authInput__input' autoComplete='off' {...props} placeholder=' '/>
    </div>
  )
}
