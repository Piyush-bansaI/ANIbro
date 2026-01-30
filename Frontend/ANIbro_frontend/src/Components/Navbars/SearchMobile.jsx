import React from 'react'
import { IoIosSearch } from "react-icons/io";

const SearchMobile = ({ShowSearchMobile,setShowSearchMobile}) => {
  return (
    <button onClick={() => setShowSearchMobile(!ShowSearchMobile)} className={`border p-2 rounded-lg ${ShowSearchMobile && 'accent-color'} transition-colors`}>
      <IoIosSearch className='text-2xl'/>
    </button>
  )
}

export default SearchMobile
