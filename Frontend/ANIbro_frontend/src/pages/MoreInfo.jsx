import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InfoLoading from '../Components/LoadingComponents/MoreInfoLoading/InfoLoading'
import AboutInfo from '../Components/MoreInfoComponents/AboutInfo'
import { moreData } from '../Contexts/MoreInfoContext'
import { netContext } from '../Contexts/NetworkContext'
import NetworkError from './NetworkError'

const MoreInfo = () => {
    const { data } = useParams()
    const [animeWeb, fullData, setData] = useContext(moreData)
    const [animeError, setAnimeError, mangaError, setMangaError] = useContext(netContext)

    useEffect(() => {
      setData(data)
    }, [data])
    
  return (
    <div className='min-h-[calc(100vh-81px)] min-w-full bg-color text-color selection:bg-amber-500/60'>
      {animeError !== "Network Error" ? (fullData ? <AboutInfo data={fullData} id={data}/> : <InfoLoading />) : <NetworkError/> }
    </div>
  )
}

export default MoreInfo
