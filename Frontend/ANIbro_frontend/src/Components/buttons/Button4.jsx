import React from 'react'

const Button4 = ({text, onclick, className, onmouseenter,isActive}) => {
  return (
    <button onMouseEnter={onmouseenter} onClick={onclick} className={`font-semibold hover:accent-color cursor-pointer ${isActive === text && 'accent-color'} ${className}`}>
      {text}
    </button>
  )
}

export default Button4
