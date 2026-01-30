import React from 'react'

const Button3 = (props) => {
  return (
    <button disabled={props.disable} title={props.title} onClick={props.function} className={`sm:p-4 disabled:opacity-75 font-bold text-lg rounded bg-color hover:bg-amber-400 hover:text-gray-800 transition-colors cursor-pointer ${props.className}`}>{props.text}</button>
  )
}

export default Button3
