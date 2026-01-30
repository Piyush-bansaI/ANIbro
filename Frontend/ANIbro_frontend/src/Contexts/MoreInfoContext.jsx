import React, { createContext, useContext, useState, useEffect } from 'react'
import { typeContext } from './TypeContext'
import { useNavigate } from 'react-router-dom'
import { netContext } from './NetworkContext'
export const moreData = createContext()
import {fetchAnime} from '../json/fetchAnime'
import {fetchManga} from '../json/fetchManga'
import axios from 'axios'

const MoreInfoContext = ({children}) => {
    const [mode, setMode, imageFetcher, jiken, langType, setLangType, langChanger, backend_URL, setUserDataRefresh, userDataRefresh, loc] = useContext(typeContext)
    const [animeError, setAnimeError, mangaError, setMangaError] = useContext(netContext)
    const [fullData, setFullData] = useState(null)
    const [data, setData] = useState(null)
    const [moreSeasonData, setmoreSeasonData] = useState({
                                                id : null,
                                                titles: [],
                                                images: []
                                              })
      const [combinedData, setCombinedData] = useState(null)
    const [CurrentId, setCurrentId] = useState(0)

    const nav = useNavigate()

    /**
    |--------------------------------------------------
    | USE-EFFECTS
    |--------------------------------------------------
    */

      useEffect(() => {
        if (!data) return
        const dataFetcher = async () => {
          try {
            const fetchData = await jiken.get(`/${mode.toLowerCase()}/${data}/full`)
            setFullData(fetchData?.data.data)
            // console.log(fetchData?.data.data)
            
          } catch (error) {
            if (error?.message === "Network Error") {
              setAnimeError(error?.message)
            }
            else if (error?.response) {
              console.log(error?.response.data.message)
              
            }
          }
        }
        dataFetcher()
      }, [mode, data])

      useEffect(() => {
      if (!fullData) return
      document.title = `ANIbro - ${fullData && fullData?.title}`;
      }, [fullData])
      
      useEffect(() => {
        if (!data) return
        if (!loc.pathname.startsWith('/Anime/') && !loc.pathname.startsWith("/Manga/")) return
        if (moreSeasonData.id?.includes(Number(data))) return
          
          setmoreSeasonData({
                            id : null,
                            titles: [],
                            images: []
                          })
        setCombinedData(null)

        const images = []
        const titles = []

        const relation = setTimeout(async () => {
          try {
            const getRelation = await backend_URL.get('/user/get-relations', {params: {mode, data}})
            
            const getId = getRelation?.data.message;

            if (getId?.length === 1) return

            for (const elem of getId) {

              const chain_data = await jiken.get(`/${mode.toLowerCase()}/${elem}/full`)

              
              images.push(chain_data?.data.data.images)
              titles.push(chain_data?.data.data.titles)

              await new Promise(resolve => setTimeout(resolve, 500))
            }

            setmoreSeasonData({
              id: getId,
              titles: titles,
              images: images,
            })
          } catch (error) {
            console.log(error?.response)
          }
        }, 500); 
        return () => clearTimeout(relation)
      }, [data, mode, loc.pathname])

      useEffect(() => {
        if (!moreSeasonData?.id || moreSeasonData?.titles.length === 0 || moreSeasonData?.images.length === 0) return
        const combined_data = moreSeasonData?.id.map((id, idx) => ({
          id: id,
          titles: moreSeasonData.titles[idx],
          images: moreSeasonData.images[idx]
        }))
        setCombinedData(combined_data)
      }, [moreSeasonData])

      useEffect(() => {
        const getId = sessionStorage.getItem("info-id")
        if (getId === data) return
        sessionStorage.setItem("info-id", data)
      }, [data])

      /**
      |--------------------------------------------------
      | FUNCTIONS
      |--------------------------------------------------
      */

      const animeWeb = (id, type) => {

        const anime_type = ["TV", "Movie", "OVA", "ONA", "Special", "Music"]
        const manga_type = ["Manga", "Light Novel", "Novel", "One-shot", "Doujinshi", "Manhwa", "Manhua"]

        let newMode = mode

        if (anime_type.includes(type)) {
          newMode = "Anime"
        }
        else if (manga_type.includes(type)) {
          newMode = "Manga"
        }
        
        setMode(newMode)
        localStorage.setItem("Mode", newMode)

        setCurrentId(id)
        nav(`/${newMode}/${id}`)
      }

      const loadData = async (name, mode) => {
        if (!name) return
        try {
          const fetchType = mode === "Anime" ? fetchAnime : fetchManga
          const fetchData = await jiken.get(fetchType.topFilter(name))
            return fetchData?.data.data
        } catch (error) {
          console.log(error)
        }
      }

      const MoreSeasonTitle = (elem) => {
       return (elem?.titles?.find(t => t.type === (langType === 'english' ? "English" : "Japanese") )?.title || elem?.titles?.find(t => t.type === "Default")?.title)
      }

  return (
    <moreData.Provider value={[animeWeb, fullData, setData, loadData, moreSeasonData, combinedData, MoreSeasonTitle]}>
        {children}
    </moreData.Provider>
  )
  
}

export default MoreInfoContext
