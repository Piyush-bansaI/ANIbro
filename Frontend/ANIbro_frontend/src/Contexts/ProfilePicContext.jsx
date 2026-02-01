import React, { createContext, useContext, useEffect, useState } from 'react'
import { messageContext } from './MessageContext'
import { typeContext } from './TypeContext'
export const profilePicture = createContext()

const ProfilePicContext = ({children}) => {
    const [selectedImg, setSelectedImg] = useState(null)
    const [brosData, setBrosData] = useState(null)
    const {createMsg} = useContext(messageContext)
    const [brosGenres, setBrosGenres] = useState(null)
    const [ToggleLogin, setToggleLogin] = useState(false)
    const [mode, setMode, imageFetcher, jiken, langType, setLangType, langChanger, backend_URL, setUserDataRefresh, userDataRefresh, loc] = useContext(typeContext)
    const [animeLst, setAnimeLst] = useState([])
    const [mangaLst, setMangaLst] = useState([])
    const [profileState, setProfileState] = useState(() => {
      if (loc.pathname === '/profile/animeList') {
        return 'Anime List'
      }
      else if (loc.pathname === '/profile/mangaList') {
        return 'Manga List'
      } else {
        return 'Profile'
      }
    })
    useEffect(() => {
      if (!brosData) return

      const getData = async () => {
        try {
          const data = await backend_URL.get('/user/get-data')
          console.log(data)
          if (data.data.message === 'Data Incoming!') {
              const datasData = data?.data?.data
              setBrosGenres(datasData?.brosGenres)
              setAnimeLst(datasData?.aniList)
              setMangaLst(datasData?.manList)
          }
        } catch (error) {
          console.log(error)
        }
      }

      getData()
    }, [brosData])
  
    

    const saveProfilePic = async () => {
        if (!selectedImg) return

        try {
            
            const samePP = await backend_URL.post("/user/save-profile", {newImg: selectedImg});
            
            createMsg(samePP.data.message, "success")
            setUserDataRefresh(prev => prev+1)
        } catch (error) {
            createMsg(error.response.data.message, "failed")
        }
    }

    const changePic = (key) => {
        setSelectedImg(key)
    }

    const saveData = async (data) => {
      if (!brosData) {
        setToggleLogin(true)
        return
      }
      if (animeLst?.some(elem => elem.mal_id === (data.mal_id || data.id)) || mangaLst?.some(elem => elem.mal_id === (data.mal_id || data.id))) {
        createMsg(`This ${mode === "Anime" ? "anime" : "manga"} already in the list bro`, 'failed'); 
        return
      }
      try {
        const sendFavData = await backend_URL.post('/user/store-fav-anime', {mode, data})
        createMsg(sendFavData.data.message, 'success')
        setUserDataRefresh(prev => prev+1)
      } catch (error) {
        console.log(error.response.data.message)
      }
    }

    const deleteData = async (id) => {
      if (!brosData) return

      try {
        const deleteAnime = await backend_URL.get('/user/delete-fav-anime', {params: {
                                                                                      mode: profileState === "Anime List"? "Anime" : "Manga",
                                                                                      mal_id: id
                                                                                    }}) 

        setUserDataRefresh(prev => prev+1)
        createMsg(deleteAnime.data.message, "success")
      } catch (error) {
        console.log(error.response)
      }
    }
  return (
    <profilePicture.Provider value={{changePic, selectedImg, saveProfilePic, brosData, setBrosData, brosGenres, ToggleLogin, setToggleLogin, saveData, animeLst, mangaLst, deleteData, profileState, setProfileState}}>
      {children}
    </profilePicture.Provider>
  )
}

export default ProfilePicContext
