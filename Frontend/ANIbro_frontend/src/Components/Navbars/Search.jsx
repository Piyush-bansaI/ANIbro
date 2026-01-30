import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import Result from './KeyResults/Result';

const Search = ({search, setSearch, mode, searchData, isSearchValid, resultPreview, className}) => {
  return (
    <form className='flex relative items-center' title='Search' onSubmit={(e) => searchData(e)}>
        <input typeof='text' value={search} onChange={(e) => {
            setSearch(e.target.value)
        }} className={`border rounded xl:w-100 w-80 caret-amber-400 p-3 font-medium pr-10 ${className}`} placeholder={mode === "Anime"? "Search Anime..": "Search Manga.."} />
        <button type='submit' onClick={(e) => searchData(e)} className='absolute right-0 cursor-pointer p-3 hover:text-amber-400 transition-colors'><IoIosSearch className='text-2xl'/></button>
        {!isSearchValid && <div className={` ${!isSearchValid ? "animate-appear" : "animate-disappear"} absolute overflow-hidden accent-bg-color left-5 top-[120%] text-black p-3 font-bold rounded`}>Please Write Something...</div>  } 
        {search.trim() !== "" && <Result search={search} resultPreview={resultPreview}/>}
      </form>
  )
}

export default Search
