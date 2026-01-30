import React from 'react'

const Button5 = ({text, className, onclick}) => {
  return (
    <button onClick={onclick} className={`bg-gray-700/80 w-[90%] rounded-2xl hover:bg-gray-700 transition-colors font-semibold text-lg cursor-pointer ${className}`}>
      {text}
    </button>
  )
}

export default Button5
