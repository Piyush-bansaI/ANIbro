import React from 'react'
import naruto from '../assets/images/naruto_mail_sender.png'

const VerifyEmail = () => {
  return (
    <div className='min-h-screen min-w-full bg-color text-color selection:bg-amber-500/60 overflow-hidden relative '>
        <div className='relative z-10 flex flex-col items-center py-50 gap-3'>
      <h1 className='capitalize lg:text-[3.5vw] md:text-5xl text-3xl font-bold accent-color'>Verification code sent</h1>
      <div className='font-semibold lg:text-[0.9vw] text-xs '>
        Check your Email which you have give to us and <span className='accent-color'>become a member</span>
      </div>
      <div className='font-semibold lg:text-[0.9vw] text-xs '>
        Note that the verification will expire in <span className='accent-color font-bold'>15 Minutes</span>
      </div>
        </div>
        <img src={naruto} className='absolute bottom-0 lg:w-[30vw] w-80 rotate-y-180 right-5 z-2 brightness-0 opacity-12 selection:bg-transparent' alt="naruto" />
        <img src={naruto} className='absolute bottom-0 lg:w-[30vw] w-80 rotate-y-180 right-0 z-2 selection:bg-transparent' alt="naruto" />
      <div className='lg:h-[35vw] lg:w-[35vw] h-110 w-110 accent-bg-color absolute -bottom-30 -right-30 rounded-full'></div>
    </div>
  )
}

export default VerifyEmail
