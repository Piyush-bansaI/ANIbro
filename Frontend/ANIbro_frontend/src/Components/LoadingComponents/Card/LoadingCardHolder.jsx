import React from 'react'
import LoadCard from './LoadCard'

const LoadingCardHolder = () => {
  return (
    <div className='flex gap-30 overflow-hidden'>
      <LoadCard />
      <LoadCard />
      <LoadCard />
      <LoadCard />
      <LoadCard />
      <LoadCard />
    </div>
  )
}

export default LoadingCardHolder
