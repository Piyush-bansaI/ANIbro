import React, { createContext, useContext, useEffect, useState } from 'react'
import { typeContext } from './TypeContext'
import { profilePicture } from './ProfilePicContext'

export const recommender = createContext()

const RecommendContext = ({children}) => {
    const [mode, setMode, imageFetcher, jiken, langType, setLangType, langChanger, backend_URL, setUserDataRefresh, userDataRefresh, loc] = useContext(typeContext)
    const {changePic, selectedImg, saveProfilePic, brosData, setBrosData, brosGenres, ToggleLogin, setToggleLogin, saveData, animeLst, mangaLst, deleteData} = useContext(profilePicture)
    const [recommendedAnime, setRecommendedAnime] = useState(() => {
        return JSON.parse(sessionStorage.getItem('recommended-anime')) || []
    })
    const [recommendedManga, setRecommendedManga] = useState(() => {
        return JSON.parse(sessionStorage.getItem('recommended-manga')) || []
    })

    useEffect(() => {
        if (!brosData) {
            setRecommendedAnime([])
            setRecommendedManga([])
            return
        }
        if (!brosGenres) return
        if (recommendedAnime?.length > 0) return
        if (recommendedManga?.length > 0) return

        const getRecommendedAnime = async () => {
            try {
                const getAnime = await backend_URL.post('/ai/anime-recommender')
                const filteredAnime = getAnime.data.genre?.filter(elem => !elem.genres.some(g => g.name === 'Hentai'))
                setRecommendedAnime(filteredAnime || [])
                (filteredAnime && sessionStorage.setItem('recommended-anime', JSON.stringify(filteredAnime)))
            } catch (error) {
                console.log(error)
            }
        }   
        const getRecommendedManga = async () => {
            try {
                const getManga = await backend_URL.post('/ai/manga-recommender')
                const filteredManga = getManga.data.genre?.filter(elem => !elem.genres.some(g => g.name === 'Hentai'))
                setRecommendedManga(filteredManga || [])
                (filteredManga && sessionStorage.setItem('recommended-manga', JSON.stringify(filteredManga)))
            } catch (error) {
                console.log(error)
            }
        } 
        getRecommendedAnime()
        getRecommendedManga()
    }, [brosData, brosGenres])

  return (
    <recommender.Provider value={{recommendedAnime, recommendedManga}}>
      {children}
    </recommender.Provider>
  )
}

export default RecommendContext
