import React, { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ShowSavedData from '../Components/ProfileComponent/ListComponents/ShowSavedData'
import { typeContext } from '../Contexts/TypeContext'
import {fetchAnime} from '../json/fetchAnime'
import {fetchManga} from '../json/fetchManga'
import ShowSearchData from '../Components/searchDataComponents/ShowSearchData'
import { dataFetch } from '../Contexts/Fetcher'
import { navContext } from '../Contexts/NavbarContext'
import Button from '../Components/buttons/Button'
import Pagination from '../Components/Pagination'

const SearchData = () => {
    const [searchData] = useSearchParams()
    const [mode, setMode, imageFetcher, jiken, langType, setLangType, langChanger, backend_URL, setUserDataRefresh, userDataRefresh, loc] = useContext(typeContext)
    const [removeNav, setRemoveNav, search, setSearch, isCategoriesShown, setIsCategoriesShown, brosData, showhentai] = useContext(navContext)
    const [SearchedData, setSearchedData] = useState(null)
    const [page, setPage] = useState(1)
    const name = searchData.get('name')

    useEffect(() => {
      document.title = `ANIbro - result of ${name}`

      const fetchType = mode === "Anime" ? fetchAnime : fetchManga

      const currentPage = `&page=${page}`

      const getSearchedData = async () => {
        try {
          const fetchSearch = await jiken.get(fetchType.search(name,showhentai + currentPage))
          const data = fetchSearch.data

          if (data.data.length === 0) {
            return
          }

          setSearchedData(data)
        } catch (error) {
          console.log(error)
        }
      }
      getSearchedData()
    }, [page])
    

  return (
    <div className='w-full min-h-[calc(100vh-90px)] bg-color text-color flex flex-col gap-10'>
      <h1 className='accent-color text-3xl font-semibold'>Searching <b>{name}</b>...</h1>
      {SearchedData ? <ShowSearchData data={SearchedData?.data}/> : 'Didn\'t got the data bro'}
      <Pagination setPage={setPage} pagination={SearchedData?.pagination} page={page}/>
    </div>
  )
}

export default SearchData
