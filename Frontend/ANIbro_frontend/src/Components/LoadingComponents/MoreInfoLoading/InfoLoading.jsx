import React from 'react'

const InfoLoading = () => {
  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-90px)] w-full bg-color text-color'>
      <div className='flex flex-col items-center gap-3'>
      <img src='https://res.cloudinary.com/dkfddgsc0/image/upload/v1769861491/loading_oews1a.gif' alt="Loading" className='w-60'/>
      <h1 className='accent-color text-4xl font-semibold animate-pulse'>Loading...</h1>
      </div>
    </div>
  )
}

export default InfoLoading
