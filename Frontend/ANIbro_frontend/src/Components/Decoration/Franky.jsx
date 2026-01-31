import React from 'react'
import franky from '../../assets/images/Franky_the_form_dude.webp'

const Franky = () => {
  return (
    <div className='relative top-5 left-10'>
        {/* background */}
        <div className='absolute bottom-0 -left-4 w-full h-full accent-bg-color skew-6'></div>
        <img src='https://res.cloudinary.com/dkfddgsc0/image/upload/v1769861516/Franky_the_form_dude_s31qv4.webp' alt="Super_Franky" className='absolute -left-7 brightness-0'/>
        <div className='w-[80%] absolute left-[18%] bottom-3.5 -rotate-2 h-1 blur-[1px] bg-black'></div>
        {/* FRANKY ⭐ */}
        <img src='https://res.cloudinary.com/dkfddgsc0/image/upload/v1769861516/Franky_the_form_dude_s31qv4.webp' alt="Super_Franky" className='relative w-80'/>
    </div>
  )
}

export default Franky
