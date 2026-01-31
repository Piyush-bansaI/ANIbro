import React from 'react'
import loading from '../../../assets/images/loading.gif'

const InfoLoading = () => {
  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-90px)] w-full bg-color text-color'>
      <div className='flex flex-col items-center gap-3'>
      <img src={loading} alt="Loading" className='w-60'/>
      <h1 className='accent-color text-4xl font-semibold animate-pulse'>Loading...</h1>
      </div>
    </div>
  )
}

export default InfoLoading
