import React, { useContext } from 'react'
import CardSwiper from '../Components/CardComponents/CardSwiper'
import Slide from '../Components/Slide';
import GiveGenreMessage from '../Components/GiveGenreMessage'
import { recommender } from '../Contexts/RecommendContext';

const Anime = ({topAnimeBanner, topAnime, loaded, otherTopAnimes, captalizeWord}) => {
    const {recommendedAnime, recommendedManga} = useContext(recommender)
  return (
    <>
      <Slide topAnimeBanner={topAnimeBanner} loaded={loaded}/>
      <GiveGenreMessage/>
      {recommendedAnime?.length > 0 && <CardSwiper text="Recommended Anime" topAnime={recommendedAnime} loaded={loaded}/>}
      <CardSwiper text="Top Anime" topAnime={topAnime} loaded={loaded}/>
      {Object.entries(otherTopAnimes).map(([key, value], idx) => {
      return <CardSwiper key={"Anime"+ key} text={`${captalizeWord(key) !== "Popular" && captalizeWord(key) !== "Favourite" ? `Top ` : `Most `}`+ captalizeWord(key)} topAnime={value} loaded={loaded}/>
      })}
    </>
  )
}

export default Anime
