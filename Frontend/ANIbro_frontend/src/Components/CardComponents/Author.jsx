import React from 'react'

const Author = ({creator, type}) => {
  return (
    <div className="mt-1 line-clamp-3">
        {creator?.length > 0 && <span className="accent-color font-semibold">{type}: </span>}
        {creator?.map((elem, idx) => {
            return <a key={idx} href={elem.url} className="text-gray-300 hover:underline">
                {elem.name}, </a>
        })}
    </div>
  )
}

export default Author
