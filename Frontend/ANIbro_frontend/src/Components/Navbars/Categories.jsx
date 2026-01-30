import React, { useContext } from 'react'
import animeGenres from '../../json/animeGenres.json'
import { allGenres } from '../../Contexts/GenreContext'

const Categories = ({isCategoriesShown, setIsCategoriesShown}) => {
  const {isTicked, setIsTicked, tick, showGenre, setShowGenre, toggleGenre, submitGenre, showMoreGenres} = useContext(allGenres)
  return (
    <div className={`w-full h-150 top-full left-0 absolute z-100 bg-gray-800 flex ${isCategoriesShown && "animate-appear"} overflow-auto`} onMouseLeave={() => setIsCategoriesShown(false)}>
      <div className='w-full h-full'>
        <div className='card-grid p-5 gap-5 place-content-center'>
          {Object.entries(animeGenres).map(([key, data]) => {
            return <button onClick={() => showMoreGenres(data.mal_id)} key={data.mal_id} className={`${data.text} ${key === 'Hentai' && 'hidden'} hover:underline place-items-center place-content-center cursor-pointer font-semibold p-5`}>{key}</button>
          })}
        </div>
      </div>
    </div>
  )
}

export default Categories
