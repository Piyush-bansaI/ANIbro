import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import Anime from './Anime';
import Manga from './Manga';
import { typeContext } from '../Contexts/TypeContext';
import NetworkError from './NetworkError';
import { netContext } from '../Contexts/NetworkContext';
import { dataFetch } from '../Contexts/Fetcher';



const Home = () => {
  // contexts
  const [mode, setMode] = useContext(typeContext)
  const [topAnimeBanner, topMangaBanner, topAnime, topManga, otherTopAnimes, otherTopMangas, isLoaded, setIsLoaded, captalizeWord] = useContext(dataFetch)
  const [animeError, setAnimeError, mangaError, setMangaError] = useContext(netContext)
 
  /**
  |--------------------------------------------------
  |                   USE EFFECTS
  |--------------------------------------------------
  */

  useEffect(() => {
    document.title = "ANIbro - Make Anime list which is suggested by your bro!";
  }, [])
  
  

  return (
    <div className='min-h-screen min-w-full bg-color text-color selection:bg-amber-500/60'>
      {animeError.message !== "Network Error" ? mode === "Anime" ? (<Anime topAnime={topAnime} loaded={isLoaded} topAnimeBanner={topAnimeBanner} otherTopAnimes={otherTopAnimes} captalizeWord={captalizeWord}/>) : null : <NetworkError setAnimeError={setAnimeError} setMangaError={setMangaError} />}
      
      {mangaError.message !== "Network Error" ? mode === "Manga" ? (<Manga topManga={topManga} loaded={isLoaded} topMangaBanner={topMangaBanner} otherTopMangas={otherTopMangas} captalizeWord={captalizeWord}/>) : null : <NetworkError setAnimeError={setAnimeError} setMangaError={setMangaError}/>}
    </div>
  )
}

export default Home
