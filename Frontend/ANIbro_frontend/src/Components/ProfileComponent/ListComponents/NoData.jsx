import React from 'react'

const NoData = ({type}) => {
  return (
    <div className='w-full flex justify-center items-center grow bg-gray-700/40 text-gray-400 font-semibold'>
        No {type} has been Saved
      </div>
  )
}

export default NoData
