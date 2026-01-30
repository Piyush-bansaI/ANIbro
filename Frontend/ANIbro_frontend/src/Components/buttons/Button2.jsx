import React from 'react'

const Button2 = (props) => {
  return (
    <button onClick={props.function} className={`border ${ props.padding || 'p-4'} rounded accent-color cursor-pointer font-semibold hover:text-amber-500 transition-colors ${props.className}`}>
      {props.text}
    </button>
  )
}

export default Button2
