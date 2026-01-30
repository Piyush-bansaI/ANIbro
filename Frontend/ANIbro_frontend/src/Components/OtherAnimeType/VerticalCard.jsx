import React, { useContext, useEffect } from 'react'
import { typeContext } from '../../Contexts/TypeContext'
import TypeAndEpisodes from '../CardComponents/TypeAndEpisodes'
import Genres from '../Genres'
import { moreData } from '../../Contexts/MoreInfoContext'
import AdultBadge from '../AdultBadge'

const VerticalCard = ({data}) => {
  const [mode, setMode, imageFetcher, jiken, langType, setLangType, langChanger] = useContext(typeContext)
  const [ animeWeb ] = useContext(moreData)
  
  
  return (
    <div className='w-130'>
    {data?.map((elem, idx) => {
      return <div onClick={() => {animeWeb(elem.mal_id)}} key={elem.mal_id} title={langChanger(elem)} className='flex gap-3 p-3 cursor-pointer hover:accent-bg-color'>
        <img src={imageFetcher(elem)} width={70} className='' alt={elem.mal_id} />
        <div className='flex flex-col gap-1'>
          <h1 className='font-semibold text-lg'>{langChanger(elem)}</h1>
          <div className='flex gap-3'>
          {elem.score && <h1 className='text-white/70'>⭐{elem.score}</h1>}
          <AdultBadge data={elem} className="w-fit font-semibold"/>
          </div>
          <TypeAndEpisodes data={elem} className="text-sm text-white/70" year/>
          <Genres data={elem} childClassName="text-xs"/>
        </div>
      </div>
    })}
    </div>
  )
}

export default VerticalCard
