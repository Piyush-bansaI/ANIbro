import React, { useContext } from 'react'
import NoData from './NoData'
import {profilePicture} from '../../../Contexts/ProfilePicContext'
import ShowSavedData from './ShowSavedData'

const AnimeList = ({data}) => {
  const {changePic, selectedImg, saveProfilePic, brosData, setBrosData, brosGenres, ToggleLogin, setToggleLogin, saveData, animeLst, mangaLst} = useContext(profilePicture)
  return (
    <div className='flex flex-col grow'>
      <h1 className='text-4xl font-bold p-5 accent-color'>Anime List</h1>
        {animeLst.length > 0 ? <ShowSavedData data={animeLst}/> : <NoData type={"Anime"}/>}
    </div>
  )
}

export default AnimeList
