import React, { useContext } from 'react'
import Data from '../Data'
import { typeContext } from '../../../Contexts/TypeContext'
import MoreSeasons from './MoreSeasons'
import { moreData } from '../../../Contexts/MoreInfoContext'

const Overview = ({data, id}) => {
  const [animeWeb, fullData, setData, loadData, moreSeasonData, combinedData] = useContext(moreData)
  const [mode, setMode, imageFetcher, jiken, langType, setLangType, langChanger, backend_URL] = useContext(typeContext)
  return (
    <div className='flex flex-col gap-1 m-5 p-5 bg-gray-700/20'>
      <Data title="Title (English): " discription={data.title_english}/>
      <Data title="Title (Japanese): " discription={data.title_japanese}/>
      <Data title="Discription: " discription={data.synopsis} discription_className="max-h-80 overflow-y-auto"/>
      <Data title="Synonym: " discription={data.titles.map((elem) => elem.title+", ")}/>
      {(moreSeasonData.id?.length !== 1 && moreSeasonData.id !== null) && <div className='flex flex-col pt-10'>
      <h1 className='accent-color text-3xl px-5 font-bold'>More Seasons</h1>
      <MoreSeasons data={data} id={id}/>
      </div>}
    </div>
  )
}

export default Overview
