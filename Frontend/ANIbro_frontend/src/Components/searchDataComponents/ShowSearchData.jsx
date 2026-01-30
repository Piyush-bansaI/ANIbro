import React, { useContext } from 'react'
import { typeContext } from '../../Contexts/TypeContext'
import AdultBadge from '../AdultBadge'
import { moreData } from '../../Contexts/MoreInfoContext'
import TypeAndEpisodes from '../CardComponents/TypeAndEpisodes'
import CardDetails from '../CardComponents/CardDetails'
import Genres from '../Genres'

const ShowSearchData = ({data, className}) => {
    const [mode, setMode, imageFetcher, jiken, langType, setLangType, langChanger, backend_URL, setUserDataRefresh, userDataRefresh, loc] = useContext(typeContext)
    const [animeWeb, fullData, setData, loadData, moreSeasonData, combinedData, MoreSeasonTitle] = useContext(moreData)
  return (
    <div className={`card-grid gap-10 place-content-center ${className}`}>
      {data?.map((elem, idx) => {
        return <div key={elem.mal_id} className='w-60' title={langChanger(elem)}>
            <div className='h-90 w-full overflow-hidden relative'>
                <img src={imageFetcher(elem)} className='w-full h-full hover:scale-110 transition-transform' alt={langChanger(elem)} onClick={() => animeWeb(elem.mal_id)}/>
                <AdultBadge data={elem} className='absolute top-2 left-2 font-semibold px-2 text-lg'/>
            </div>
            <h1 className='accent-color line-clamp-1 font-bold text-2xl'>{langChanger(elem)}</h1>
            <TypeAndEpisodes data={elem} year className='text-sm text-gray-300 my-1'/>
            <Genres data={elem} hidden parentClassName='text-sm'/>
        </div>
      })}
    </div>
  )
}

export default ShowSearchData
