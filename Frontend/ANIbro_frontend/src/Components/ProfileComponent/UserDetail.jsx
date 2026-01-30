import React, { useContext } from 'react'
import LabelAndData from './UserDetailComponents/LabelAndData';
import { FaPlus } from "react-icons/fa";
import { allGenres } from '../../Contexts/GenreContext';

const UserDetail = ({data, isActive}) => {
  const {isTicked, setIsTicked, tick, showGenre, setShowGenre, toggleGenre} = useContext(allGenres)
  return (
    <div className='p-5'>
      <div className='flex flex-col gap-5'>
        <LabelAndData data={data} label='Username' discription={data.username}/>
        <LabelAndData data={data} label='Email' discription={data.email} showBadge discriptionClassName='text-white/80'/>
        {<button onClick={toggleGenre} className='w-fit flex items-center gap-1 font-semibold text-xl accent-color cursor-pointer border p-5'>
         <FaPlus className='text-lg'/> Add Genres
        </button>}
      </div>
    </div>
  )
}

export default UserDetail
