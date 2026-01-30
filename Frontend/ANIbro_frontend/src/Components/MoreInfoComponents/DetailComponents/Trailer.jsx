import React from 'react'

const Trailer = ({data}) => {
  return (
    <div className='flex gap-5 flex-col p-5'>
      <h1 className='accent-color text-2xl font-bold'>Trailer</h1>
        <iframe  src={data.trailer.embed_url} className='w-fit' allowFullScreen title={data.title}></iframe >
    </div>
  )
}

export default Trailer
