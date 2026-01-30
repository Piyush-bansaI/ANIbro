import React, { useContext } from 'react'
import CardSwiper from '../Components/CardComponents/CardSwiper'
import Slide from '../Components/Slide'
import { recommender } from '../Contexts/RecommendContext'

const Manga = ({topManga, topMangaBanner, loaded, otherTopMangas, captalizeWord, resultPreview}) => {
  const {recommendedAnime, recommendedManga} = useContext(recommender)
  return (
    <>
        <Slide topAnimeBanner={topMangaBanner} loaded={loaded}/>
        {recommendedManga?.length > 0 && <CardSwiper text="Recommended Manga" topAnime={recommendedManga} loaded={loaded}/>}
        <CardSwiper text="Top Manga" topAnime={topManga} loaded={loaded}/>
        {Object.entries(otherTopMangas).map(([key, data], idx) => {
          if (!data) return null
          return <CardSwiper key={"Manga"+idx} text={`${captalizeWord(key) !== "Popular" && captalizeWord(key) !== "Favourite" ? `Top ` : `Most `}` + captalizeWord(key)} topAnime={data} loaded={loaded}/>
        })}
    </>
  )
}

export default Manga
