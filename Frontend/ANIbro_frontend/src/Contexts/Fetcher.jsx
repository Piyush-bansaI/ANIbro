import React, { createContext, useContext, useEffect, useState } from 'react'
import { typeContext } from './TypeContext';
import { netContext } from './NetworkContext';
import { fetchAnime } from '../json/fetchAnime';
import { fetchManga } from '../json/fetchManga';
import { useLocation } from 'react-router-dom';
export const dataFetch = createContext()

const Fetcher = ({children}) => {
  const [mode, setMode, imageFetcher, jiken, langType, setLangType, langChanger, backend_URL, setUserDataRefresh, userDataRefresh, loc] = useContext(typeContext)
  const [animeError, setAnimeError, mangaError, setMangaError] = useContext(netContext)
  // anime Categories
  const [topMangaBanner, setTopMangaBanner] = useState(() => {
    const hasTopManga = JSON.parse(sessionStorage.getItem("top-manga"))
    return hasTopManga ? hasTopManga.slice(0, 10) : null  
  })
  const [topAnimeBanner, setTopAnimeBanner] = useState(() => {
    const hasTopAnime = JSON.parse(sessionStorage.getItem("top-anime"))
    return hasTopAnime ? hasTopAnime.slice(0, 10) : null
  })
  const [topAnime, setTopAnime] = useState(() => {
    return JSON.parse(sessionStorage.getItem("top-anime")) || null
  })
  const [otherTopAnimes, setOtherTopAnimes] = useState(() => {
      return JSON.parse(sessionStorage.getItem("other-top-anime")) || { 
                                            airing: null,
                                            upcoming: null,
                                            favorite: null,
                                            bypopularity: null,
                                          }
  })
  const [topManga, setTopManga] = useState(() => {
    return JSON.parse(sessionStorage.getItem("top-manga")) || null
  })
  const [otherTopMangas, setOtherTopMangas] = useState(() => {
      return JSON.parse(sessionStorage.getItem("other-top-manga")) || { 
                                            publishing: null,
                                            favorite: null,
                                            bypopularity: null,
                                          }
  })  
  const totalTopAnimeCategories = ["airing", "upcoming", "favorite", "bypopularity"]
  const totalTopMangaCategories = ["publishing", "bypopularity", "favorite"]
  // content loaded confirmer
  const [isLoaded, setIsLoaded] = useState(() => {
    if (mode === "Anime") {
     const hasTopAnime = JSON.parse(sessionStorage.getItem("top-anime"))
     const hasTopOtherAnime = JSON.parse(sessionStorage.getItem("other-top-anime"))
     return (hasTopAnime && hasTopOtherAnime) ? true : false
    } else if (mode === "Manga") { 
     const hasTopManga = JSON.parse(sessionStorage.getItem("top-manga"))
     const hasTopOtherManga = JSON.parse(sessionStorage.getItem("other-top-manga"))
     return (hasTopManga && hasTopOtherManga) ? true : false
    }
  })

  /**
   * Functions
   */

  const captalizeWord = (word) => {
      const capitalWords = {
        airing: "Airing",
        upcoming: "Up Coming",
        favorite: "Favourite",
        bypopularity: "Popular",
        publishing: "Publishing",
      };
     return capitalWords[word] || word;
    }

  const removeDuplicates = (data) => {
    const set = new Set();
    return data.filter(item => {
      if (set.has(item.mal_id)) return false
      set.add(item.mal_id)
      return true
    })
  }

  const otherTopDataFetcher = async (data, source, setData) => {
    
      for (const elem of data) {
            try {
                let topCategoryData = await jiken.get(source.topFilter(elem))
              if (topCategoryData.status === 200) {
                setData(prev => ({
                  ...prev,
                  [elem]: removeDuplicates(topCategoryData.data.data)
                }));
              }

              await new Promise(resolve => setTimeout(resolve, 700))

            } catch (error) {
              console.log("didn't get the data", error);
            }
        }
  }

  /**
   * Use Effects
   */

  // Anime
  useEffect(() => {
    if (loc.pathname !== '/') return
    if (topAnime && otherTopAnimes.airing) return
    if (mode !== "Anime") return
    const fetchAnimeData = async () => {
      
      try {
        if (isLoaded) setIsLoaded(false)
        const animeTopData = await jiken.get(fetchAnime.top);

        
        await otherTopDataFetcher(totalTopAnimeCategories, fetchAnime, setOtherTopAnimes);

        setTopAnimeBanner(animeTopData.data.data.slice(0, 10))
        setTopAnime(animeTopData.data.data)
        sessionStorage.setItem("top-anime", JSON.stringify(animeTopData.data.data))
      } catch (err) {
        console.log("err:", err)
        setAnimeError(err)
      } finally {
         setIsLoaded(true)
      }
    }
    fetchAnimeData()
  }, [mode, loc.pathname])

  // Manga
  useEffect(() => {
    if (loc.pathname !== '/') return
    if (topManga && otherTopMangas.publishing) return
    if (mode !== 'Manga') return
    const fetchMangaData = async () => {
      try {
        if (isLoaded) setIsLoaded(false)
        const mangaTopData = await jiken.get(fetchManga.top);

        await otherTopDataFetcher(totalTopMangaCategories, fetchManga, setOtherTopMangas);
        

        setTopMangaBanner(mangaTopData.data.data.slice(0, 10))
        setTopManga(mangaTopData.data.data)
        sessionStorage.setItem("top-manga", JSON.stringify(mangaTopData.data.data))

      } catch (err) {
        console.log("err:",err)
        setMangaError(err)
      } finally {
         setIsLoaded(true)
      }
    }
    fetchMangaData()
  }, [mode, loc.pathname])
  
  useEffect(() => {
    if (otherTopAnimes.airing && otherTopAnimes.upcoming && otherTopAnimes.favorite && otherTopAnimes.bypopularity) {
          sessionStorage.setItem("other-top-anime", JSON.stringify(otherTopAnimes))
        }
  }, [otherTopAnimes])
  useEffect(() => {
    if (otherTopMangas.publishing && otherTopMangas.favorite && otherTopMangas.bypopularity) {
          sessionStorage.setItem("other-top-manga", JSON.stringify(otherTopMangas))
        }
  }, [otherTopMangas])
  

  return (
    <dataFetch.Provider value={[topAnimeBanner, topMangaBanner, topAnime, topManga, otherTopAnimes, otherTopMangas, isLoaded, setIsLoaded, captalizeWord, removeDuplicates, totalTopAnimeCategories, totalTopMangaCategories]}>
        {children}
    </dataFetch.Provider>
  )
}

export default Fetcher
