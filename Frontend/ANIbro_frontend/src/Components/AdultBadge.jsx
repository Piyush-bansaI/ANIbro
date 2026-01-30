import React from 'react'

const AdultBadge = ({data, className}) => {
    const adult = data.rating;
  return (
    (adult === "R - 17+ (violence & profanity)" || adult === "R+ - Mild Nudity" ||adult === "Rx - Hentai") && <div className={`accent-bg-color text-black rounded p-0.5 px-1 ${className}`}>18+</div>
  )
}

export default AdultBadge
