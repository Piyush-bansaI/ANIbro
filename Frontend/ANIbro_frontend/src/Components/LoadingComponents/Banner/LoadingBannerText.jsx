import React from 'react'

const LoadingBannerText = () => {
  return (
    <div className='absolute z-20 w-full h-full flex flex-col justify-center gap-4 p-5'>
        <div className='w-10 h-5 loading-component'></div>
        <div className='w-[30vw] h-25 loading-component'></div>
        <div className='w-[25vw] h-25 loading-component'></div>
        <div className='w-[40vw] h-20 loading-component'></div>
        <div className='w-50 h-5 loading-component'></div>
        <div className='flex gap-5'>
        <div className='w-30 h-10 loading-component'></div>
        <div className='w-30 h-10 loading-component'></div>
        </div>
    </div>
  )
}

export default LoadingBannerText
