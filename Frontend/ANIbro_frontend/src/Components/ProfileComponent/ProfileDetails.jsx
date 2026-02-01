import React, { forwardRef, useContext, useEffect, useRef } from 'react'
import Button5 from '../buttons/Button5'
import { MdOutlineLogin } from "react-icons/md";
import { FaUserNinja } from "react-icons/fa6";
import { typeContext } from '../../Contexts/TypeContext';
import { useNavigate } from 'react-router-dom';
import { profilePicture } from '../../Contexts/ProfilePicContext';


const ProfileDetails = forwardRef(({data, logout, setIsProfileClicked, isProfileClicked}, ref) => {
  const nav = useNavigate()
  const [mode, setMode, imageFetcher, jiken, langType, setLangType, langChanger, backend_URL] = useContext(typeContext)
  const {changePic, selectedImg, saveProfilePic, brosData, setBrosData, brosGenres, ToggleLogin, setToggleLogin, saveData, animeLst, mangaLst, deleteData, profileState, setProfileState} = useContext(profilePicture)
  

  const profile = () => {
    nav(`/profile/${encodeURIComponent(data.username)}`)
    setProfileState("Profile")
    setIsProfileClicked(false)
  }
  const aniList = () => {
    nav(`/profile/animeList`)
    setProfileState("Anime List")
    setIsProfileClicked(false)
  }
  const manList = () => {
    nav(`/profile/mangaList`)
    setProfileState("Manga List")
    setIsProfileClicked(false)
  }

  return (
    <div className='absolute z-100 top-full right-0 min-w-100 py-5 bg-color border border-amber-400/50 rounded-lg' ref={ref}>
      <h1 className='font-semibold px-5 pb-3 text-lg'>Sup! <span className='accent-color capitalize'>{data.username},</span></h1>
      <div className='flex flex-col items-center gap-3'>
        <Button5 onclick={profile} text={<><FaUserNinja /> Profile</>} className="py-2 flex justify-center items-center gap-2 "/>
        <Button5 onclick={mode === "Anime" ? aniList : manList} text={`${mode === "Anime" ? '📑 Anime' : '📔 Manga'} List`} className="py-2"/>
        <Button5 onclick={logout} text={<><MdOutlineLogin className='text-xl'/>Log Out</>} className="py-2 flex justify-center items-center gap-2 hover:bg-red-300/20"/>
      </div>
    </div>
  )
})

export default ProfileDetails
