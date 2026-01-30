import React, { useContext, useState } from 'react'
import {profilePic} from '../../json/ProfilePic'
import { useNavigate } from 'react-router-dom'
import { profilePicture } from '../../Contexts/ProfilePicContext'
import Genres from '../Genres'

const ProfileHero = ({brosData}) => {
    const nav = useNavigate()
    const [isProfileHover, setisProfileHover] = useState(false)
    const {changePic, selectedImg, saveProfilePic, Data, setBrosData, brosGenres} = useContext(profilePicture)

    const changeProfile = () => {
        nav('/profile-change')
    }
  return (
    <div className='relative z-1 mt-50 flex p-20 gap-10'>
        <button onClick={changeProfile} onMouseEnter={() => setisProfileHover(true)} onMouseLeave={() => setisProfileHover(false)}  className='relative cursor-pointer rounded-full'>
            <div className={`absolute w-full h-full bg-black/40 ${!isProfileHover && "hidden"} rounded-full  flex justify-center items-center`}>
                <h1>Change Profile</h1>
            </div>
            <div className='w-60 h-60'>
            <img src={profilePic[brosData?.avatar]} className='rounded-full h-full object-cover' alt={brosData?.avatar} />
            </div>
        </button>
        <div className='flex flex-col gap-3'>
            <h1 className='text-[4vw] font-bold'>Hey <span className='accent-color capitalize'>{brosData?.username}!</span></h1>
            <div className='accent-color flex items-center gap-3'>Favourite Genres: {brosGenres ? <Genres data={brosGenres} favGenre/> : 'None'}</div>
        </div>
    </div>
  )
}

export default ProfileHero
