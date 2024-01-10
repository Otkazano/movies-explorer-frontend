import React from 'react'
import './FilterCheckbox.css'
import Switch from 'react-switch'

export default function FilterCheckbox () {
  const [checked, setChecked] = React.useState(false)
  const handleChange = nextChecked => {
    setChecked(nextChecked)
  }
  return (
    <Switch
      id='filterCheckbox'
      onChange={handleChange}
      checked={checked}
      className='filterCheckbox'
      handleDiameter={10}
      offColor='#C4C4C4'
      onColor='#2BE080'
      offHandleColor='#fff'
      onHandleColor='#fff'
      height={16}
      width={36}
      borderRadius={10}
      uncheckedIcon={false}
      checkedIcon={false}
      activeBoxShadow={'0 0 1px 2px #3456F3'}
    />
  )
}
