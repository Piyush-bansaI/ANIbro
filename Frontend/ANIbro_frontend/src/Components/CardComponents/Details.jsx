import React from 'react'

const Details = ({title, discription, className}) => {
        
  return (
  <div className={`line-clamp-3 ${!discription && "hidden"} mt-1 text-white/60 font-semibold ${className}`}>
    <span className="accent-color">{title}</span>{discription}
    </div>
  )
}

export default Details
