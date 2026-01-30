import React from 'react'

const TypeAndEpisodes = ({data, className, year}) => {
  return (
    <div className={`flex gap-1 items-center ${className}`}>
        {data.type}

        {(data?.episodes || data?.volumes) && <span className="accent-color">●</span>}
        {data?.episodes} {data?.episodes > 0 && `${data?.episodes == 1 ? "Episode" :"Episodes"}`}
        {data?.volumes} {data?.volumes > 0 && `${data?.volumes == 1 ? "Volume" :"Volumes"}`}

        {/* <span className={`${!year && "hidden"}`}>
        {data?.year && <span className="accent-color">● </span>}
        {data?.year}</span> */}
        <span className={`${!year && "hidden"}`}>
        {data?.year && <span className="accent-color">● </span>}
        {data?.year}</span>
    </div>
  )
}

export default TypeAndEpisodes
