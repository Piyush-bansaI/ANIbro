import React from 'react'

const LoadCard = () => {
  return (
    <div className='flex gap-4'>
      <div className='flex w-7 flex-col gap-4'>
        <div className='grow  loading-component'></div>
        <div className='h-[10%] loading-component'></div>
      </div>
        <div className='w-50 h-80 loading-component '></div>
    </div>
  )
}

export default LoadCard
