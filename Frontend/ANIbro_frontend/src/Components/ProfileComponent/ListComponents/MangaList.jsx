import React, { useContext } from 'react'
import NoData from './NoData'
import { profilePicture } from '../../../Contexts/ProfilePicContext'
import ShowSavedData from './ShowSavedData'

const MangaList = ({data}) => {
  const {changePic, selectedImg, saveProfilePic, brosData, setBrosData, brosGenres, ToggleLogin, setToggleLogin, saveData, animeLst, mangaLst} = useContext(profilePicture)
  return (
    <div className='flex flex-col grow  '>
      <h1 className='text-4xl p-5 font-bold accent-color'>Manga List</h1>
      {mangaLst.length > 0 ? <ShowSavedData data={mangaLst}/> :  <NoData type={'Manga'}/>}
      
    </div>
  )
}

export default MangaList
