import React, { useContext, useEffect, useRef, useState } from 'react'
import { typeContext } from '../../../Contexts/TypeContext'
import { profilePicture } from '../../../Contexts/ProfilePicContext'
import Button from '../../buttons/Button'
import { FiMoreHorizontal } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { moreData } from '../../../Contexts/MoreInfoContext';
import TypeAndEpisodes from '../../CardComponents/TypeAndEpisodes';
import Genres from '../../Genres';

const SavedCard = ({elem, idx}) => {
    const [mode, setMode, imageFetcher, jiken, langType, setLangType, langChanger, backend_URL, setUserDataRefresh, userDataRefresh, loc] = useContext(typeContext)
    const {changePic, selectedImg, saveProfilePic, brosData, setBrosData, brosGenres, ToggleLogin, setToggleLogin, saveData, animeLst, mangaLst, deleteData} = useContext(profilePicture)
    const [animeWeb, fullData, setData, loadData, moreSeasonData, combinedData, MoreSeasonTitle] = useContext(moreData)
    const [showMenu, setShowMenu] = useState(false)
    const moreMenu = useRef(null)
    const moreBtn = useRef(null)
    

    useEffect(() => {
        const closeOnOutside = (e) => {
            if (moreBtn.current?.contains(e.target)) return
            if (!moreMenu.current?.contains(e.target)) {
              setShowMenu(false)
            }
        }

        document.addEventListener('mousedown', closeOnOutside)
        return () => {
            document.removeEventListener('mousedown', closeOnOutside)
        }
        }, [])
    

        const toggleMenu = (e) => {
            setShowMenu(!showMenu)
        }

  return (
    <div className=' w-50 my-7.5'>
            <div className='relative w-fit h-80'>
                <div className='w-full h-full overflow-hidden flex justify-center'>
                <img src={imageFetcher(elem)} className='cursor-pointer hover:scale-105 transition-transform duration-300' alt={elem.title} onClick={() => animeWeb(elem.mal_id, elem.type)} title={elem.title}/>
                </div>
                <div className='absolute top-3 right-3 '>
                    <div key={elem.mal_id || idx} className='relative'>
                        <Button function={(e) => toggleMenu(e)} ref={moreBtn} text={<FiMoreHorizontal/>} className='p-1 text-xl'/>
                        {showMenu && <div ref={moreMenu} className='bg-color absolute left-full rounded-xl border border-amber-400/30 z-10'>
                            <button onClick={() => deleteData(elem.mal_id)} className='flex items-center p-2 px-4 text-red-400 hover:bg-red-400/10 rounded-xl hover:border-red-400 border border-black'><IoClose className='text-xl'/> Remove</button>
                        </div>}
                    </div>
                </div>
            </div>
            <div className=''>

            <h1 className='text-lg font-semibold line-clamp-1 accent-color'>{langChanger(elem)}</h1>
            <TypeAndEpisodes data={elem} className='text-xs my-1' year/>
            <Genres data={elem} hidden parentClassName='text-sm'/>
            </div>
        </div>
  )
}

export default SavedCard
