import React, { useEffect, useState } from 'react'
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

const Input = ({text, type, value, setValue, autoComplete, className}) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false)
    const [isTextUp, setIsTextUp] = useState(false)


    const upText = () => {
        setIsTextUp(true)
    }
    const downText = () => {
        setIsTextUp(false)
    }
    const showPassword = () => {
        setIsPasswordShown(!isPasswordShown)
    }
  return (
    <div className='relative flex flex-col'>
        <input value={value} onBlur={downText} onFocus={upText} onChange={(e) => {
            setValue(e?.target.value)
        }} autoComplete={autoComplete} type={type === "password"? `${isPasswordShown ? "text" : "password"}`: type} name={text} id={text} className={`border rounded ${(type === "password") && "pr-12"} focus:border-[#b5aea1] text-md font-semibold w-90 h-13 p-2 outline-none caret-amber-400 ${className}`} />
        <label htmlFor={text} className={`absolute cursor-text transition-all px-2 text-white/50 left-2 ${isTextUp || value?.length > 0? "-top-3 text-sm bg-color accent-color" : "top-1/2 -translate-y-1/2 font-semibold"} capitalize`}>{text}</label>
        <button onClick={showPassword} type='button' className='absolute right-10 text-2xl h-full'>
            <div className={`relative ${(type !== "password" || (!isTextUp && value?.length === 0)) && "hidden"} flex items-center`}>
                {isPasswordShown ?
                <IoEyeOff className='absolute'/>:
                <IoEye className='absolute'/>}
            </div>
        </button>
    </div>
  )
}

export default Input
