import React, { forwardRef } from 'react'
import {profilePic} from '../../json/ProfilePic'


const Profile = forwardRef(({data, setIsProfileClicked, isProfileClicked}, ref) => {
    
  const clickProfile = () => {
    setIsProfileClicked(!isProfileClicked)
  }

  return (
    <button onClick={clickProfile} className='cursor-pointer w-15 h-15' ref={ref}>
      
      <img src={profilePic[data.avatar]} className='rounded-full object-cover h-full' alt={data.avatar} />
    </button>
  )
})

export default Profile
