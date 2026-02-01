import React, { useContext, useEffect, useState } from 'react'
import Button3 from './buttons/Button3'
import { RxCross2 } from "react-icons/rx";
import { allGenres } from '../Contexts/GenreContext';
import {profilePicture} from '../Contexts/ProfilePicContext'

const GiveGenreMessage = () => {
  const {isTicked, setIsTicked, tick, showGenre, setShowGenre, toggleGenre} = useContext(allGenres)
  const {changePic, selectedImg, saveProfilePic, brosData, setBrosData, brosGenres} = useContext(profilePicture)
  const [showGenreMessage, setShowGenreMessage] = useState(false)

  useEffect(() => {
    setShowGenreMessage(() => {
    return (brosData && (!brosGenres || brosGenres?.length === 0)) ? true : false
  })
  }, [brosData, brosGenres])
  
  return (
    <div className={`bg-gray-700 my-5 p-3 font-semibold relative overflow-hidden flex items-center justify-between text-xl ${!showGenreMessage && "hidden"}`}>
      <div className='absolute w-20 h-[110%] -left-5 bg-amber-400/60 -rotate-40'></div>
      <div className='absolute w-20 h-[110%] -left-10 bg-amber-500/90 -rotate-45'></div>
      <div className='absolute w-20 h-[110%] -right-10 bg-amber-500/90 -rotate-45'></div>
      <span className='relative text-shadow-2xs text-shadow-black'>Want to get recommended anime? give your favorite genres and have it!</span>
        <div className='relative flex items-center gap-5'>
        <Button3 function={toggleGenre} text="Select Genre"/>
        <button onClick={() => setShowGenreMessage(false)} className='cursor-pointer hover:bg-white/20 p-2 rounded-full transition-colors duration-400' title='close'><RxCross2/></button>
        </div>
    </div>
  )
}

export default GiveGenreMessage
