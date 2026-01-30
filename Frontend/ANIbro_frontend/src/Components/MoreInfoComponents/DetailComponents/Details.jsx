import React, { useEffect } from 'react'
import Data from '../Data'
import Trailer from './Trailer'

const Details = ({data}) => {
  
  return (
    <div className='flex flex-col gap-1 m-5 p-5 bg-gray-700/20'>
      <Data title="Score: " discription={data.score} discription_className="before:content-['⭐']"/>
      <Data title="Airing: " discription={data.status}/>
      <Data title="Year: " discription={data.year}/>
      <Data title="Rating: " discription={data.rating}/>
      <Data title="Duration: " discription={data.duration}/>
      <Data title="Season: " discription={data.season}/>
      <Data title="background: " discription={data.background} discription_className="max-h-60 overflow-y-auto px-2"/>
      {data.producers?.length != 0 &&  <Data title="Producers: " discription={data.producers?.map((elem, idx) => {
        return <a key={idx} href={elem.url} className='hover:bg-gray-700/80 hover:text-gray-400/90 transition-colors bg-gray-700 rounded p-2'>{elem.name} </a>
      })} discription_className="font-normal text-sm flex gap-3 flex-wrap p-2 justify-end line-clamp-2" title_className='relative top-2.5'/>}
      {data.licensors?.length != 0 && <Data title="Licensors: " discription={data.licensors?.map((elem, idx) => {
        return <a key={idx} href={elem.url} className='hover:bg-gray-700/80 hover:text-gray-400/90 transition-colors bg-gray-700 rounded p-2'>{elem.name} </a>
      })} discription_className="font-normal text-sm flex gap-3 flex-wrap p-2 justify-end line-clamp-2" title_className='relative top-2.5'/>}
      {data.trailer && <Trailer data={data}/>}
    </div>
  )
}

export default Details
