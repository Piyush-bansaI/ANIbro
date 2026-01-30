import React from 'react'

const ResultCardLoad = () => {
  return (
    <div className='flex h-40 p-3 gap-3'>
      <div className='w-20 h-30 loading-component'></div>
      <div className='grow p-3 gap-3 flex flex-col'>
        <div className='h-5.5 loading-component'></div>
        <div className='h-3 max-w-20 loading-component'></div>
        <div className='h-4 max-w-30 loading-component'></div>
        <div className='max-w-50 flex gap-3 h-8'>
        <div className='loading-component grow h-full'></div>
        <div className='loading-component grow h-full'></div>
        <div className='loading-component grow h-full'></div>
        </div>
      </div>
    </div>
  )
}

export default ResultCardLoad
