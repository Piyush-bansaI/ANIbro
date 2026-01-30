import React, { useContext } from 'react'
import animeGenres from '../json/animeGenres.json'
import mangaGenres from '../json/mangaGenres.json'
import {typeContext} from '../Contexts/TypeContext'

const Genres = ({data, hidden, parentClassName, childClassName, favGenre}) => {
  const [mode, setMode, imageFetcher, genres] = useContext(typeContext)
  return (
    <div title={hidden && "Tap it and use ←, → arrow key to see more genres"} className={`flex ${hidden ? "overflow-x-auto no-scroll":"flex-wrap"} ${parentClassName}`}>
      {favGenre ? data?.map((elem, idx) => {
        return <a title={elem} key={idx} target='_blank' className={`${mode === "Anime" ? `${animeGenres[elem].bg} ${animeGenres[elem].text}` : `${animeGenres[elem].bg} ${animeGenres[elem].text}`} p-2 m-1 border rounded-lg flex text-nowrap justify-center items-center w-fit ${childClassName}`}>{elem}</a>
      }) :  data.genres?.map((elem) => {
        return <a title={elem.name} key={elem.mal_id} target='_blank' href={elem.url} className={`${mode === "Anime" ? `${animeGenres[elem.name].bg} ${animeGenres[elem.name].text}` : `${animeGenres[elem.name].bg} ${animeGenres[elem.name].text}`} p-2 m-1 border rounded-lg flex text-nowrap justify-center items-center w-fit ${childClassName}`}>{elem.name}</a>
      })}
    </div>
  )
}

export default Genres
