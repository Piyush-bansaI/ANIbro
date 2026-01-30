import React, { useContext, useEffect } from 'react'
import VerticalCard from './VerticalCard'
import ResultLoader from '../LoadingComponents/KeyResult/ResultLoader'

const VerticalCards = ({heading, data, upto}) => {
  return (
    <div className='p-3 flex flex-col gap-4'>
      <h1 className='text-3xl font-bold accent-color'>{heading}</h1>
        {data ? <VerticalCard data={data?.slice(0, (upto || 10))}/>: <ResultLoader className="w-130"/>}
    </div>
  )
}

export default VerticalCards
