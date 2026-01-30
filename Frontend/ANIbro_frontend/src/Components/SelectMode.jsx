import React from 'react'

const SelectMode = ({option1, option2, title, onClick, toggler, className}) => {
  return (
    <button onClick={onClick} title={title} className={`flex flex-col gap-1 items-center cursor-pointer ${className}`}>
      <div className=' bg-white/20 items-center flex text-sm font-semibold rounded overflow-hidden'>
      <span className={`p-1 ${!toggler && "accent-bg-color text-black"}`}>{option1}</span>
      <span className={`p-1 ${toggler && "accent-bg-color text-black"}`}>{option2}</span>
      </div>
      <h1 className='font-semibold text-sm'>{title}</h1>
    </button>
  )
}

export default SelectMode
