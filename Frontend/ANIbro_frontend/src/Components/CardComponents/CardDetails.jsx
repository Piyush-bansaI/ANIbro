import React, { forwardRef, useContext } from 'react'
import { FaPlus } from 'react-icons/fa'
import Button from '../buttons/Button'
import Button2 from '../buttons/Button2'
import CardDetailLeft from './CardDetailLeft'
import CardDetailRight from './CardDetailRight'
import {typeContext} from '../../Contexts/TypeContext'
import { moreData } from '../../Contexts/MoreInfoContext'
import { profilePicture } from '../../Contexts/ProfilePicContext'
const CardDetails = forwardRef(({activeContent, setActiveContent, producers, popupPos, creatorType}, ref) => {
    const [mode, setMode, imageFetcher] = useContext(typeContext) 
    const [ animeWeb ] = useContext(moreData)
    const {changePic, selectedImg, saveProfilePic, brosData, setBrosData, brosGenres, ToggleLogin, setToggleLogin, saveData} = useContext(profilePicture)
  return (
    <div onMouseEnter={() => setActiveContent(activeContent)} onMouseLeave={() => setActiveContent(null)} style={{
      left: popupPos.x,
      top: popupPos.y
    }} className={`fixed z-60 bg-[#342200] rounded-xl text-color w-120` } ref={ref}>
      <div className="flex p-5 gap-3">
        <CardDetailLeft activeContent={activeContent}/>
        <CardDetailRight activeContent={activeContent} producers={producers} creatorType={creatorType}/>
      </div>
      <div className="flex p-5 justify-between">
        <div className='flex gap-3'>
      <Button2 function={() => animeWeb(activeContent.mal_id || activeContent.id, activeContent.type)} text="More Info"/>
      <Button function={() => saveData(activeContent)} text={<FaPlus className="text-white"/>} className="px-4 text-2xl"/>
      </div>
      </div>
    </div>
  )
} )
export default CardDetails
