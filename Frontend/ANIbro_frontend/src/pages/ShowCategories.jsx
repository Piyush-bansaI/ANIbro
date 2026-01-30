import React, { useContext, useEffect } from 'react'
import { allGenres } from '../Contexts/GenreContext'
import ShowSearchData from '../Components/searchDataComponents/ShowSearchData'
import { useSearchParams } from 'react-router-dom'
import Pagination from '../Components/Pagination'

const ShowCategories = () => {
  const [params] = useSearchParams()
  const {isTicked, setIsTicked, tick, showGenre, setShowGenre, toggleGenre, submitGenre, showMoreGenres, showAboutGenre, isCategoriesShown, setIsCategoriesShown, loadMoreGenres, setGenreCurrentPage, genreCurrentPage} = useContext(allGenres)
  const id = params.get('id')
  const name = params.get('name')

  useEffect(() => {
    if (!id || !name) return
    loadMoreGenres(id, name)
  }, [id, name, genreCurrentPage])
  
  return (
    <div className='w-full min-h-[calc(100vh-90px)] bg-color text-color'>
      <h1 className='text-3xl accent-color font-bold p-2 px-10'>{name} Animes</h1>
      <ShowSearchData data={showAboutGenre?.data} className='my-10'/>
      <Pagination pagination={showAboutGenre?.pagination} page={genreCurrentPage} setPage={setGenreCurrentPage}/>
    </div>
  )
}

export default ShowCategories
