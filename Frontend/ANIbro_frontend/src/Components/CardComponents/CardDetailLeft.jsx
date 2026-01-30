import React, { useContext } from 'react'
import Details from './Details'
import { typeContext } from '../../Contexts/TypeContext'

const CardDetailLeft = ({activeContent}) => {
  const [mode, setMode, imageFetcher] = useContext(typeContext)
  return (
    <div className="w-[35%] ">
          <img  src={imageFetcher(activeContent)} alt={activeContent.title} />
          <h1 className="w-full text-center text-lg font-semibold text-gray-300 ">⭐{activeContent.score || "N/A"}</h1>
          <div>
            <Details title="Airing: " discription={activeContent.status}/>
            <Details title="Season: " discription={activeContent.season}/>
            {activeContent?.rating && <Details title="Rating: " discription={activeContent.rating || "N/A"}/>}
          </div>
    </div>
  )
}

export default CardDetailLeft
