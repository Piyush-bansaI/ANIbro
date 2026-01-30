import React, { useContext, useState } from 'react'
import { navContext } from '../Contexts/NavbarContext'
import {profilePic} from '../json/ProfilePic'
import Button3 from '../Components/buttons/Button3'
import { TiTick } from "react-icons/ti";
import { profilePicture } from '../Contexts/ProfilePicContext';

const ChangeProfile = () => {
    const [removeNav, setRemoveNav, search, setSearch, isCategoriesShown, setIsCategoriesShown, brosData] = useContext(navContext)
    const {changePic, selectedImg, saveProfilePic} = useContext(profilePicture)

    

  return (
    <div className='min-h-[calc(100vh-82px)] min-w-full bg-color text-color selection:bg-amber-500/60 p-5 lg:flex gap-10 lg:absolute bottom-0'>
        <div className='flex flex-col w-[20%] items-center'>
            <div className='w-70 h-70'>
            <img src={profilePic[selectedImg || brosData?.avatar]} className=' my-5 rounded-full object-cover h-full w-full' alt={brosData?.avatar}/>
            </div>
            <Button3 disable={!selectedImg} function={saveProfilePic} text="Save Changes" className="mt-auto my-5 border accent-color px-20 disabled:hover:text-amber-400 disabled:hover:bg-gray-900"/>
        </div>
        <div className='w-[80%] h-[85vh] bg-gray-800 p-5 flex justify-center overflow-auto'>
            <div className='flex flex-wrap gap-10 h-fit'>
            {Object.entries(profilePic).map(([key, data]) => (
            <button key={key} onClick={() => changePic(key)} className='relative w-50 h-50 rounded-full cursor-pointer hover:outline-5 outline-amber-400 transition-all'>
                <img src={data} className=' w-full h-full object-cover rounded-full' alt="" />
                <div className={`absolute right-5 bottom-5 w-5 h-5 bg-blue-500 -skew-8 ${brosData?.avatar !== key && 'hidden'}`}>
                    <div className='relative w-full h-full'>
                        <TiTick className='absolute  w-full h-full'/>
                    </div>
                </div>
            </button>
            ))}
            </div>
        </div>
    </div>
  )
}

export default ChangeProfile
