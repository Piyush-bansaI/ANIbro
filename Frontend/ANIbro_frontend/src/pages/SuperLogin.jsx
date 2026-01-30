import React from 'react'
import Button3 from '../Components/buttons/Button3'
import { RxCross1 } from "react-icons/rx";
import Franky from '../Components/Decoration/Franky';
import Input from '../Components/LoginComponents/Input';
import { useNavigate } from 'react-router-dom';

const SuperLogin = ({name, setName, password, setPassword, login, toggleLogin, setToggleLogin, loginMessage}) => {
    const navigate = useNavigate()
    const signup = () => {
        navigate("/signup");
        setToggleLogin(false)
    }
    const hideLogin = () => {
      setToggleLogin(false)
      setName("")
      setPassword("")
    }
  return (
    <div className={`fixed z-100 h-full text-color w-full top-0 left-0 flex justify-center items-center `}>
      <button onClick={hideLogin} className={` fixed top-0 left-0 h-full w-full bg-black/30 `}></button>
      <div className='relative bg-color w-300 h-200 rounded-xl flex p-10'>
        <button onClick={hideLogin} className='absolute z-40 p-5 top-5 right-5 text-white hover:text-amber-400 cursor-pointer'><RxCross1 className='text-xl'/></button>
        {/* SignUp Recommendation */}
        <div className='w-full flex flex-col items-center justify-center gap-3'>
            <h1 className='text-4xl font-semibold text-center'>New Member?<br />
            <span className='text-5xl font-bold'>Become a <span className='accent-color'>BRO!</span></span></h1>
            <Button3 function={signup} text="SIGN UP!" className="mt-5 w-70 border border-amber-400 accent-color hover:drop-shadow-amber-400 drop-shadow-lg"/>
            <Franky />
        </div>
        {/* divider */}
        <div className='h-full flex flex-col justify-between mx-2 items-center'>
            <div className='grow bg-white/20 w-[0.1px]'></div>
            <div className='my-5 text-sm font-semibold text-white/60'>OR</div>
            <div className='grow bg-white/20 w-[0.1px]'></div>
        </div>
        {/* Login */}
        <div className='w-full flex flex-col justify-center items-center gap-5 relative'>
          <div className={`text-red-400 bg-red-400/15 border rounded-lg p-2 px-4 absolute top-25 ${loginMessage === 'e' && "hidden"}`}>{loginMessage}</div>
            <h1 className='text-4xl font-bold'>WelcomeBack <span className='accent-color'>Bro!</span></h1>
            <form className='flex flex-col gap-10 p-4 ' method='post'>
                <Input text="username" type="text" value={name} setValue={setName}/>
                <Input text="password" type="password" value={password} setValue={setPassword}/>
                <Button3 function={login} text="Login!" className="mt-5 border border-amber-400 accent-color hover:drop-shadow-amber-400 drop-shadow-lg uppercase "/>
            </form>
        </div>
      </div>
    </div>
  )
}

export default SuperLogin
