import React, { createContext, useContext, useState } from 'react'
import SelectGenres from '../Components/SelectGenresComponents/SelectGenres'
import animeGenres from '../json/animeGenres.json'
import mangaGenres from '../json/mangaGenres.json'
import { typeContext } from './TypeContext'
import { messageContext } from './MessageContext'
import {fetchAnime} from '../json/fetchAnime'
import {fetchManga} from '../json/fetchManga'
import genres from '../json/animeGenres.json'
export const allGenres = createContext()

const GenreContext = ({children}) => {
  const [mode, setMode, imageFetcher, jiken, langType, setLangType, langChanger, backend_URL, setUserDataRefresh, userDataRefresh, loc, nav,isAdult, setIsAdult, showhentai] = useContext(typeContext)
  const [showGenre, setShowGenre] = useState(false)
  const {createMsg} = useContext(messageContext)
  const [showAboutGenre, setShowAboutGenre] = useState(null)
  const [genreCurrentPage, setGenreCurrentPage] = useState(1)
  const [isTicked, setIsTicked] = useState([])
    const tick = (key) => {
      setIsTicked(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])
    }
  // show categories
  const [isCategoriesShown, setIsCategoriesShown] = useState(false)

    const toggleGenre = () => {
      setShowGenre(!showGenre)
    }

    const submitGenre = async () => {
      if (isTicked.length === 0) return

      try {
        const storeGenre = await backend_URL.post('/user/store-genre', {genres: isTicked})
        
        console.log(storeGenre.data.message)
        createMsg(storeGenre.data.message, "success")
      } catch (error) {
        console.log(error.response.data.message)
      }
      setShowGenre(!showGenre)
      setIsTicked([])
    }

    const showMoreGenres = async (data) => {
      const genreName = Object.entries(genres).find(([_, genre], idx) => genre.mal_id === Number(data))?.[0] 
      nav(`/${mode}/genres?id=${data}&name=${genreName}`)
    }

    const loadMoreGenres = async (id, genreName) => {
      setIsCategoriesShown(false)
      const fetchGenre = mode === "Anime" ? fetchAnime : fetchManga

        try {
          
          const loadGenre = await jiken.get(fetchGenre.genreInfo(id+`&page=${genreCurrentPage}${showhentai}`))
          setShowAboutGenre(loadGenre.data)
        } catch (error) {
          console.log(error.response)
        }
    }

  return (
    <allGenres.Provider value={{isTicked, setIsTicked, tick, showGenre, setShowGenre, toggleGenre, submitGenre, showMoreGenres, showAboutGenre, isCategoriesShown, setIsCategoriesShown, loadMoreGenres, setGenreCurrentPage, genreCurrentPage}}>
      {showGenre && <SelectGenres isTicked={isTicked} toggleGenre={toggleGenre} submitGenre={submitGenre} setGenreCurrentPage={setGenreCurrentPage} genreCurrentPage={genreCurrentPage}/>}
      {children}
    </allGenres.Provider>
  )
}

export default GenreContext
