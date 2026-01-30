import React, { useContext } from 'react'
import Input from '../LoginComponents/Input'
import Button3 from '../buttons/Button3'
import { Link } from 'react-router-dom'
import { SignUp } from '../../Contexts/SignUpContext'
import { typeContext } from '../../Contexts/TypeContext'

const SignUpComponent = () => {
    const {username, setUsername, email, setEmail, password, setPassword, signUp, message, passwordStrength, getToken, usernameAvilable, dataSender, isLoggedIn, setIsLoggedIn} = useContext(SignUp)
    const [mode, setMode, imageFetcher, jiken, langType, setLangType, langChanger, backend_URL, setUserDataRefresh, userDataRefresh, loc, nav,isAdult, setIsAdult, showhentai] = useContext(typeContext)
    
  return (
    <div className='relative z-10 flex flex-col justify-center items-center h-full gap-10'>
        <div className={`p-3 px-5 rounded-md ${message === "e" && "opacity-0"} border text-red-400 bg-red-400/10`}>
          {message}
        </div>
        <h1 className=' capitalize text-6xl font-bold accent-color'>signUp!</h1>
        <form method='post' className='flex flex-col gap-5 items-center'>
            <div>
            <Input text="Username" type="text" autoComplete="off" value={username} setValue={setUsername} className="lg:w-120 lg:h-15 lg:p-4 text-lg input-width"/>
            <h1 className={`text-gray-500 font-semibold `}>Availability: <span className={`${usernameAvilable === 'it already exists bro' ? "text-red-400" : 'text-green-400'}`}>{usernameAvilable}</span></h1> 
            </div>
            <Input text="Email" type="text" value={email} setValue={setEmail} className="lg:w-120 lg:h-15 lg:p-4 text-lg input-width"/>
            <div className='flex flex-col gap-1'>
            <Input text="Password" type="password" autoComplete="off" value={password} setValue={setPassword} className="lg:w-120 lg:h-15 lg:p-4 text-lg input-width"/>
            <div className='text-white/40 font-semibold w-full '>
              Strength: <span className={`${passwordStrength === "it's weak" && "text-red-400" || passwordStrength === "pretty strong" && "accent-color" || passwordStrength === "hella strong 💪" && "text-green-400"} capitalize`}>{passwordStrength}</span>
            </div>
            </div>
            <div className='text-sm flex flex-col items-center w-full gap-1'>
              <div className='flex gap-1 items-center '>
                <input type="checkbox" name="adult" className='cursor-pointer accent-amber-400' checked={isAdult} onChange={(e) => {
                  setIsAdult(e.target.checked)
                }} />
                Are you an <span className='accent-color'>Adult!?,</span> (don't tick if you a kiddo)</div>
               <Link to={"/questions"} className='font-semibold accent-color hover:underline'>Why are you asking!?</Link> </div> 
            <Button3 function={signUp} text="Submit" className="border accent-color accent-bg-color/5 w-[70%] "/>
            
            <div className='text-white/60'>Already a member? <Link to={"/"} className='accent-color font-semibold hover:underline'>Login</Link></div>
        </form>
    </div>
  )
}

export default SignUpComponent
