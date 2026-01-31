import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
export const typeContext = createContext()

  const TypeContext = ({children}) => {
      const nav = useNavigate()
      const loc = useLocation()
      // base API URL
      let jiken = axios.create({
        baseURL: "https://api.jikan.moe/v4"});
      let backend_URL = axios.create({
        baseURL: "https://anibro-production.up.railway.app",
        withCredentials: true
      });
      // 18+ things
        const [isAdult, setIsAdult] = useState(false)
      const showhentai = !isAdult ? "&genres_exclude=12" : ""

      const [mode, setMode] = useState(() => {
        return  localStorage.getItem("Mode") || "Anime"
        })

      const [langType, setLangType] = useState(() => {
        return localStorage.getItem("langType") || "english"
      })
      const [userDataRefresh, setUserDataRefresh] = useState(0)

      const imageFetcher = (img) => {
        if (img?.images?.webp) {
          const webp = img?.images?.webp
          return webp?.large_image_url || webp?.image_url || webp?.small_image_url
        } else{
          const jpg = img?.images?.jpg
          return jpg?.large_image_url || jpg?.image_url || jpg?.small_image_url
        }
      }
      const langChanger = (text) => {
        if (langType === "english") {
          
          return text.title_english || text.title
        } else if (langType === "japanese"){
          return  text.title_japanese || text.title
        }
      }
    
      
      
      
  return (
    <div>
      <typeContext.Provider value={[mode, setMode, imageFetcher, jiken, langType, setLangType, langChanger, backend_URL, setUserDataRefresh, userDataRefresh, loc, nav,isAdult, setIsAdult, showhentai]}>
        {children}
      </typeContext.Provider>
    </div>
  )
}

export default TypeContext
