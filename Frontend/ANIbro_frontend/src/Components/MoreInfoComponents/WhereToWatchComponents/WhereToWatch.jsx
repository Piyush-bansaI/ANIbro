import React, { useState } from 'react'
import Data from '../Data'

const WhereToWatch = ({data}) => {
  
  return (
    <div className='flex flex-col gap-10 m-5 p-5 bg-gray-700/20'>
      <Data className='items-center' title='Hianime.to:' discription={
        <a target='_blank' href={`https://hianime.to/search?keyword=${encodeURIComponent(data.title)}`} 
        className='accent-bg-color flex p-5 rounded cursor-pointer text-black font-semibold text-lg hover:bg-amber-400/95 transition-colors'>
          {
          <div className='flex items-center gap-3'>
          <img src={`https://img.logo.dev/hianime.to?token=pk_fahI7vTVT02j0AMxH47_Kg&size=30&fallback=404`} className='rounded-xl'/>
          <h1>HiAnime.to</h1>
          </div>
          }
          </a>
        }/>
      <Data className='items-center' title='Hianime.do:' discription={
        <a target='_blank' href={`https://hianime.do/search?keyword=${encodeURIComponent(data.title)}`} 
        className='accent-bg-color flex p-5 rounded cursor-pointer text-black font-semibold text-lg hover:bg-amber-400/95 transition-colors'>
          {
          <div className='flex items-center gap-3'>
          <img src={`https://img.logo.dev/hianime.to?token=pk_fahI7vTVT02j0AMxH47_Kg&size=30&fallback=404`} className='rounded-xl'/>
          <h1>HiAnime.do</h1>
          </div>
          }
          </a>
        }/>
      {data?.streaming?.map((elem, idx) => {
        const [hasError, setHasError] = useState(false)
        return <Data key={idx} title={elem.name + ':'} className='items-center' discription={
        <a target='_blank' href={elem.url} 
        className='accent-bg-color flex p-5 rounded cursor-pointer text-black font-semibold text-lg hover:bg-amber-400/95 transition-colors'>
          {
          <div className='flex items-center gap-3'>
          <img src={`https://img.logo.dev/${elem.name}.com?token=pk_fahI7vTVT02j0AMxH47_Kg&size=30&fallback=404`} onError={() => setHasError(true)} className={`${hasError && 'hidden'}`} />
          <h1>{elem.name}</h1>
          </div>
          }
          </a>
        }/>
      })}
    </div>
  )
}

export default WhereToWatch
