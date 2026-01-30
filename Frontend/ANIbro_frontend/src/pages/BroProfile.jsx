import React, { useContext, useEffect, useState } from 'react'
import { navContext } from '../Contexts/NavbarContext'
import {profilePic} from '../json/ProfilePic'
import Button4 from '../Components/buttons/Button4'
import ProfileHero from '../Components/ProfileComponent/ProfileHero'
import ProfileNav from '../Components/ProfileComponent/ProfileNav'
import UserDetail from '../Components/ProfileComponent/UserDetail'
import AnimeList from '../Components/ProfileComponent/ListComponents/AnimeList'
import MangaList from '../Components/ProfileComponent/ListComponents/MangaList'
import { typeContext } from '../Contexts/TypeContext'
import { profilePicture } from '../Contexts/ProfilePicContext'

const BroProfile = () => {
    const [removeNav, setRemoveNav, search, setSearch, isCategoriesShown, setIsCategoriesShown] = useContext(navContext)
    const [mode, setMode, imageFetcher, jiken, langType, setLangType, langChanger, backend_URL, setUserDataRefresh, userDataRefresh, loc] = useContext(typeContext)
    const {changePic, selectedImg, saveProfilePic, brosData, setBrosData, brosGenres, ToggleLogin, setToggleLogin, saveData, animeLst, mangaLst, deleteData, profileState, setProfileState} = useContext(profilePicture)

    const changeToProfile = () => {
        setProfileState('Profile')
    }
    const changeToAnime = () => {
        setProfileState('Anime List')
    }
    const changeToManga = () => {
        setProfileState('Manga List')
    }
    useEffect(() => {
      document.title = `Anibro - ${brosData?.username || 'profile'}`
    }, [])
    
  return (
    <div className='min-h-full w-full bg-color text-color selection:bg-amber-500/60 flex flex-col absolute top-0'>
        <div className='absolute blur-2xl opacity-50 h-100 w-full top-0 overflow-hidden'>
        <img src={profilePic[brosData?.avatar]} className='w-full h-screen object-cover' alt="" />    
        </div>
        <ProfileHero brosData={brosData}/>
        <ProfileNav changeToProfile={changeToProfile} changeToAnime={changeToAnime} changeToManga={changeToManga} isActive={profileState}/>
        {profileState === "Profile" && <UserDetail data={brosData}/>}
        {profileState === "Anime List" && <AnimeList data={brosData}/>}
        {profileState === "Manga List" && <MangaList data={brosData}/>}
    </div>
  )
}

export default BroProfile
