import React from 'react'
import LoadingBannerText from './LoadingBannerText'

const LoadingBanner = () => {
  return (
    <div className="relative w-full h-full accent-bg-color/5 overflow-hidden text-color">
        <div className='accent-bg-color animate-loading blur-xl w-10'></div>
        <LoadingBannerText/>
    </div>  
  )
}

export default LoadingBanner
