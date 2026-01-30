import React, { useContext } from 'react'
import { typeContext } from '../../Contexts/TypeContext'
import AdultBadge from '../AdultBadge'
import TypeAndEpisodes from '../CardComponents/TypeAndEpisodes'
import Button from '../buttons/Button'
import Genres from '../Genres'
import { profilePicture } from '../../Contexts/ProfilePicContext'

const HeroSection = ({data}) => {
  const [mode, setMode, imageFetcher, jiken, langType, setLangType, langChanger] = useContext(typeContext)
  const {changePic, selectedImg, saveProfilePic, brosData, setBrosData, brosGenres, ToggleLogin, setToggleLogin, saveData, animeLst, mangaLst, deleteData} = useContext(profilePicture)
  return (
    <div className=' flex ml-20 gap-10'>
        <div className='relative max-w-[20%] -top-10'>
            <img src={imageFetcher(data)} className='w-full' alt="" />
            <AdultBadge data={data} className="absolute top-3 left-3 px-2 py-1 font-bold"/>
        </div>
        <div className='flex flex-col gap-1'>
        <h1 className='lg:text-[2.5vw] text-2xl font-bold line-clamp-2'>{langChanger(data)}</h1>
        <div className='flex gap-3'>
        <TypeAndEpisodes data={data} year className="font-semibold text-white/80"/>
        {data.status === 'Not yet aired' && <div className='border p-2 text-sm opacity-85 rounded-lg font-semibold'>Upcoming</div>}
        </div>
        <h1 className='accent-color font-semibold'>{data.status}</h1>
        <Genres data={data} parentClassName="my-1"/>
        <Button text="add to list" className="capitalize w-fit p-4 font-bold text-xl mb-4" showLogo function={() => saveData(data)}/>
        </div>
    </div>
  )
}

export default HeroSection
