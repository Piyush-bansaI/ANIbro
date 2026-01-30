import React, { useContext } from 'react'
import Details from './Details'
import TypeAndEpisodes from './TypeAndEpisodes'
import Author from './Author'
import Genres from '../Genres'
import { typeContext } from '../../Contexts/TypeContext'
const CardDetailRight = ({activeContent, producers, creatorType}) => {
  const [mode, setMode, imageFetcher, jiken, langType, setLangType, langChanger] = useContext(typeContext)
  return (
    <div className="w-[80%]">
        <h1 className="text-2xl font-bold">{langChanger(activeContent)}</h1>
        <div className="my-1">
        <TypeAndEpisodes data={activeContent} year className="text-white/80"/>
        </div>
        <div className="max-h-30 overflow-y-auto text-white/90">{activeContent.synopsis}</div>
        <Details title="Synonyms: " discription={activeContent.title_synonyms.join(", ")}/>
        <Author creator={producers} type={creatorType}/>
        <Genres data={activeContent} parentClassName="mt-2"/>
    </div>
  )
}

export default CardDetailRight
