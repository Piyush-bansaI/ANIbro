import React, { forwardRef } from 'react'
import { IoIosArrowDroprightCircle } from "react-icons/io";

const Button = forwardRef((props, ref) => {
  return (
    <button ref={ref} disabled={props.disabled} title={props.title} onClick={props.function} className={`btn text-gray-800 ${props.className}  rounded flex items-center gap-3 disabled:opacity-75`}>{props.text}{props.showLogo &&  <span><IoIosArrowDroprightCircle/></span>}</button>
  )
})

export default Button
