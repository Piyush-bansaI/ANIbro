import React, { useContext, useEffect } from 'react'
import Button from '../Components/buttons/Button'
import { navContext } from '../Contexts/NavbarContext'

const NetworkError = ({setAnimeError, setMangaError}) => {
  const [, setRemoveNav] = useContext(navContext)
    const home = () => {
        window.location.reload()
        setAnimeError({message: null})
        setMangaError({message: null})
    }
    useEffect(() => {
      setRemoveNav(true)
    }, [])
    
  return (
    <div className='flex justify-center items-center min-h-screen'>
        <div className='flex flex-col items-center gap-3'>
            <img src='https://res.cloudinary.com/dkfddgsc0/image/upload/v1769861636/Pikachu_gwh5ov.png' alt="Pikachu" className='xl:w-[18vw] md:w-[200px] w-[150px]'/>
            <h1 className='md:text-5xl sm:text-4xl text-3xl font-bold capitalize'>No network 🛜</h1>
            <Button function={home} text="Reload" showLogo className="py-4 lg:px-10 px-6 font-bold lg:text-2    xl text-xl mt-4"/>
      </div>
    </div>
  )
}

export default NetworkError
