import React from 'react'
import LoadingCardHolder from './LoadingCardHolder'

const LoadingCards = () => {
  return (
    <div className='p-5 flex flex-col gap-5'>
      <h1 className='loading-component lg:w-[14vw] h-10 px-5'></h1>
      <LoadingCardHolder/>
    </div>
  )
}

export default LoadingCards
