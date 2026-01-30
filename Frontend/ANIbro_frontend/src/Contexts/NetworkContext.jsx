import React, { createContext, useContext, useState } from 'react'
import { typeContext } from './TypeContext'
export const netContext = createContext()

const NetworkContext = ({children}) => {
    const [mode, setMode, imageFetcher,jiken] = useContext(typeContext)
    
    // network error variables
    const [animeError, setAnimeError] = useState({message: null})
    const [mangaError, setMangaError] = useState({message: null})

  return (
    <netContext.Provider value={[animeError, setAnimeError, mangaError, setMangaError]}>
        {children}
    </netContext.Provider>
  )
}

export default NetworkContext
