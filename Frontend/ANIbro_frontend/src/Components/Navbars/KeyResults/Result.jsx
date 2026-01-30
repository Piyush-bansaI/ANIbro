import React from 'react'
import ResultCards from './ResultCards'
import ResultLoader from '../../LoadingComponents/KeyResult/ResultLoader'

const Result = ({search, resultPreview}) => {
  return (
    <div className={`bg-color ${search.trim() !== "" && "animate-appear"} absolute w-full top-full`}>
      {resultPreview !== null ? (resultPreview?.length > 0) ? <ResultCards resultPreview={resultPreview}/> : <h1 className='capitalize text-center py-3 font-bold text-lg'>didn't got the data bro 😅</h1> : <ResultLoader/>}
      {resultPreview?.length > 0 && <button className='w-full text-center font-bold text-xl accent-bg-color/50 py-4'>More Info &gt;</button>}
    </div>
  )
}

export default Result
