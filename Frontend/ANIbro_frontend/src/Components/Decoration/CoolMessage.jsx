import React from 'react'

const CoolMessage = ({text1, text2}) => {
  return (
    <div className='absolute z-40 accent-color -right-10 2xl:top-[5vw] bottom-[30vw] text-[6.5vw] font-bold flex flex-col leading-[7.5vw] -skew-18 -skew-x-15 remove-on-small-screen'>
        <div className='relative'>
        <div className='absolute h-[150%] w-[85%] bg-amber-500/70 top-1/2 left-1/2 skew-5 -translate-1/2 '></div>
        <div className='absolute h-[120%] w-[95%] bg-amber-400/80 top-1/2 left-1/2 skew-3 -translate-1/2 '></div>
        <div className='bg-color pl-20 pr-15 relative z-1'>
            <h1 className='pl-15'>{text1}</h1>
            <h1 className='uppercase'>{text2}</h1>
        </div>
        </div>
    </div>
  )
}

export default CoolMessage
