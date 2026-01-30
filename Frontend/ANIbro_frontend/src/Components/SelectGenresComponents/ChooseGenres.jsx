import React, { useContext, useEffect, useState } from 'react'
import animeGenres from '../../json/animeGenres.json'
import { TiTick } from "react-icons/ti";
import { allGenres } from '../../Contexts/GenreContext';


const ChooseGenres = ({className}) => {
  const {isTicked, setIsTicked, tick, showGenre, setShowGenre, toggleGenre} = useContext(allGenres)  

  return (
    <div className='dynamic-grid w-full h-[calc(100vh-20vh)] no-scroll overflow-y-auto snap-y overflow-x-hidden'>
      {Object.entries(animeGenres).map(([key, data], idx) => {
        
        return <div onClick={() => tick(key)} key={data.character} className={`${className} ${(key === 'Hentai' || key === 'Award Winning') && 'hidden'} cursor-pointer relative ${data.bg} -skew-x-10 hover:scale-102 transition-all duration-200 ${data.text} text-4xl mx-5 mt-40 font-bold before:content-[''] before:absolute ${data['bg-2']} before:w-full before:h-full before:top-0 before:left-0 hover:before:skew-x-20 before:skew-2 before:transition-all before:duration-400 before:opacity-75 before:z-[-1] z-10 snap-center outline-2 ${isTicked.includes(key) && 'before:outline-3 before:outline-white'}`}>
          <div className={`relative w-full bg-color top-0 py-10 px-10 border-2 ${isTicked.includes(key) && 'shadow-sm shadow-white'}`}>
            {isTicked.includes(key) && <div className={`absolute ${!data.character_url ? '-right-3 -top-3' : '-left-3 -bottom-3'} border rounded-full ${data['bg-2']} bg-color`}><TiTick/></div>}
            <h1>{key}</h1>
            <div className={`${!data.character_url && 'hidden'} skew-x-8 absolute w-60 bottom-0 right-0 h-70 overflow-hidden`}>
              <img src={data.character_url} className={`object-cover w-full h-full object-top-left `} alt="" />
            </div>
          </div>
        </div>
      })}
    </div>
  )
}

export default ChooseGenres
