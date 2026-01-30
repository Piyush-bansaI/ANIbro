import React, { useContext } from 'react'
import { typeContext } from '../../../Contexts/TypeContext'
import TypeAndEpisodes from '../../CardComponents/TypeAndEpisodes'
import Genres from '../../Genres'
import AdultBadge from '../../AdultBadge'
import { moreData } from '../../../Contexts/MoreInfoContext'
import { navContext } from '../../../Contexts/NavbarContext'

const ResultCards = ({resultPreview}) => {
    const [mode, setMode, imageFetcher, jiken, langType, setLangType, langChanger] = useContext(typeContext)
    const [,, search, setSearch] = useContext(navContext)
    const [ animeWeb ] = useContext(moreData)
    const resultClick = (data) => {
      animeWeb(data.mal_id)
      setSearch("")
    }
  return (
    <div>
      {resultPreview?.map((elem, idx) => {
        return <div onClick={() => resultClick(elem)} key={elem.mal_id} className='flex p-5 gap-3 hover:accent-bg-color border-b border-dotted border-amber-400/40 overflow-hidden' title={elem.title}>
             <img src={imageFetcher(elem)} width={70}  alt={elem.mal_id} />
             <div className='grow w-full line-clamp-1'>
                <h1 className=' text-lg font-semibold line-clamp-1'>{langChanger(elem)}</h1>
                <div className='flex gap-3 items-center my-1'>
                  <div className='font-semibold text-white/80'>⭐{elem.score || "N/A"}</div>
                  <AdultBadge data={elem} className=" font-semibold text-sm"/>
                </div>
                <TypeAndEpisodes data={elem} className="tracking-tight text-sm"/>
                <Genres data={elem} hidden childClassName="text-sm" parentClassName="mt-1"/>
             </div>
        </div>
      })}
    </div>
  )
}

export default ResultCards
