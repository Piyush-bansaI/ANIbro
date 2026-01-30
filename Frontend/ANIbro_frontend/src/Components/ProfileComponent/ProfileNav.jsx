import React from 'react'
import Button4 from '../buttons/Button4'

const ProfileNav = ({changeToProfile, changeToAnime, changeToManga, isActive}) => {
  return (
    <div className='bg-gray-700/70 flex gap-5 h-fit'>
        <Button4 onclick={changeToProfile} text="Profile" className={`p-3`} isActive={isActive}/>
        <Button4 onclick={changeToAnime} text="Anime List" className={`p-3`} isActive={isActive}/>
        <Button4 onclick={changeToManga} text="Manga List" className={`p-3`} isActive={isActive}/>
    </div>
  ) 
}

export default ProfileNav
