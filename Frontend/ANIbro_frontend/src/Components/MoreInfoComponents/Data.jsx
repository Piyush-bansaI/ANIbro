import React from 'react'

const Data = ({title, discription, className, title_className, discription_className}) => {
  return (
    <>
      {discription && <div className={`flex gap-1 font-semibold min-w-80 p-2 text-lg ${className}`}>
        <h1 className={`accent-color grow ${title_className}`}>{title}</h1>
        <div className={`text-gray-300/90 ${discription_className}`}>{discription}</div>
      </div>}
    </>
  )
}

export default Data
