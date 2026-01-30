import React, { useContext, useEffect, useState } from 'react'
import {moreData} from '../../../Contexts/MoreInfoContext'
import { typeContext } from '../../../Contexts/TypeContext'

const MoreSeasons = ({data, id}) => {
    const [animeWeb, fullData, setData, loadData, moreSeasonData, combinedData, MoreSeasonTitle] = useContext(moreData)
    const [mode, setMode, imageFetcher, jiken, langType, setLangType, langChanger, backend_URL, setUserDataRefresh, userDataRefresh, loc] = useContext(typeContext)
    
  return (
    <div className='flex flex-wrap p-5 2xl:justify-start justify-center gap-3'>
        {combinedData?.map((elem, idx) => {
          return <button onClick={() => Number(id) !== elem.id && animeWeb(elem.id)} key={elem.id} title={MoreSeasonTitle(elem) + (Number(id) === elem.id ? ` (Currently here)`: "")} className={`relative border-2 ${Number(id) === elem.id ? 'accent-color':'text-[#fff0cbe4] hover:text-[#ffd66fe4]'} transition-colors duration-200 h-30 w-60 rounded-lg overflow-hidden p-5 flex justify-center items-center cursor-pointer`}>
            <img key={idx} src={imageFetcher(elem)} className='w-full object-cover h-full blur-md absolute top-0 right-0 brightness-80' alt={elem.id} />
            <h1 className='relative font-semibold  line-clamp-2'>{MoreSeasonTitle(elem)}</h1>
          </button> 
        })}
    </div>
  )
}

export default MoreSeasons
