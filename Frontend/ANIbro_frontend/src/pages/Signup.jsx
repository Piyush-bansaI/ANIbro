import React, { useContext, useEffect } from 'react'
import { navContext } from '../Contexts/NavbarContext'
import SignUp_pic from '../assets/images/one_piece_transparent.png'
import SignUp_bg from '../assets/images/one_piece_extended.jpg'
import CoolMessage from '../Components/Decoration/CoolMessage'
import SignUpComponent from '../Components/SignUp/SignUpComponent'

const Signup = () => {

  const [, setRemoveNav] = useContext(navContext)

  useEffect(() => {
    document.title = 'Become a BRO!'
  }, [])
  
  
  return (
    <div className='min-h-screen min-w-full bg-black text-color selection:bg-amber-500/60 flex justify-center items-center'>
      <div className='w-[90%] max-w-[1343px] h-200 relative overflow-hidden rounded-lg flex 2xl:bg-gray-300 xl:bg-[#2f628f]'>
        <img src={SignUp_bg} alt="SignUp_pic" className='absolute remove-on-small-screen 2xl:-top-[9vw] w-[44%] right-0 -bottom-[1vw] brightness-85 blur-[1px]'/>
        <CoolMessage text1="become" text2="one of us!"/>
        <div className='xl:w-[56%] w-full relative bg-color'>
            <SignUpComponent />
        </div>
        <div className='grow z-50 relative remove-on-small-screen'>
        <img src={SignUp_pic} alt="SignUp_pic" className='absolute z-50  2xl:-top-[9vw] -bottom-[1vw] right-0 brightness-105 drop-shadow-lg drop-shadow-black'/>
        </div>
      </div>
    </div>
  )
}

export default Signup
