import React, { useContext, useEffect, useState } from 'react'
import VerticalCards from '../OtherAnimeType/VerticalCards'
import { typeContext } from '../../Contexts/TypeContext'
import HeroSection from './HeroSection'
import TitleNav from './TitleNav'
import Details from './DetailComponents/Details'
import { dataFetch } from '../../Contexts/Fetcher'
import Overview from './OverviewComponents/Overview'
import { moreData } from '../../Contexts/MoreInfoContext'
import WhereToWatch from './WhereToWatchComponents/WhereToWatch'

const AboutInfo = ({data, id}) => {
  const [mode, setMode, imageFetcher] = useContext(typeContext)
  const [animeWeb, fullData, setData, loadData] = useContext(moreData)
  const [topAnimeBanner, topMangaBanner, topAnime, topManga, otherTopAnimes, otherTopMangas, isLoaded, setIsLoaded, captalizeWord, removeDuplicates, totalTopAnimeCategories, totalTopMangaCategories] = useContext(dataFetch)
  const [showCurrentData, setShowCurrentData] = useState("overview")
  const [OtherData, setOtherData] = useState(() => {
    return mode === "Anime" ? otherTopAnimes : otherTopMangas
  })
  const [randCategory, setRandCategory] = useState(null)

  useEffect(() => {
    const categoryPicker = () => {  
      const category = mode === "Anime" ? totalTopAnimeCategories : totalTopMangaCategories
      if (!category || category.length === 0) return
      setRandCategory(category[Math.floor(Math.random() * category.length)])
    }
    categoryPicker()
  }, [mode])
  

  return (
    <div>
      <div className='w-full h-80 overflow-hidden blur-md'>
        <img src={imageFetcher(data)} className='w-full h-full object-cover object-left brightness-50' alt={data.mal_id} />
      </div>
      <div className='lg:flex relative'>
        <div className=' grow'>
          <HeroSection data={data}/>
          <TitleNav showCurrentData={showCurrentData} setShowCurrentData={setShowCurrentData} data={data}/>
          {showCurrentData === "overview" && <Overview data={data} id={id}/>}
          {showCurrentData === "details" && <Details data={data}/>}
          {showCurrentData === "whereToWatch" && <WhereToWatch data={data}/>}
        </div>
        <div>
          <VerticalCards heading={`${captalizeWord(randCategory) !== "Popular" && captalizeWord(randCategory) !== "Favourite" ? `Top` : `Most`} ${captalizeWord(randCategory)}`} data={OtherData?.[randCategory]} upto={8}/>
          </div>
      </div>
    </div>
  )
}

export default AboutInfo
