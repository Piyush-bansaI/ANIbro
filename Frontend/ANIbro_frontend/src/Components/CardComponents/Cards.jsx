import "swiper/css";
import "swiper/css/navigation";
import { useContext, useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Button3 from "../buttons/Button3";
import { Navigation } from "swiper/modules";
import CardDetails from "./CardDetails";
import LoadingCards from "../LoadingComponents/Card/LoadingCards";
import { typeContext } from "../../Contexts/TypeContext";
import AdultBadge from "../AdultBadge";
import { moreData } from "../../Contexts/MoreInfoContext";
const Cards = ({data, loaded}) => {
  const [mode, setMode, imageFetcher, jiken, langType, setLangType, langChanger] = useContext(typeContext)
  const [ animeWeb ] = useContext(moreData)
  const [activeContent, setActiveContent] = useState(null)
  const [popupPos, setPopupPos] = useState({x: 0, y:0})
  let popup_ref = useRef(null)
  const [popupHeight, setpopupHeight] = useState(0)
  const popup_width = 350;
  const producers = activeContent?.authors ? activeContent?.authors : activeContent?.producers;
  const creatorType = activeContent?.authors ? "Authors" : "Producers"
  useEffect(() => {
    if (!popup_ref?.current) return
    if (popup_ref?.current) {
      let popup_measurement = popup_ref.current?.getBoundingClientRect()
      setpopupHeight(popup_measurement.height)
    }
  }, [activeContent])
  

  return (
    <div className='flex my-5 min-w-full'>
      {( window.innerWidth > 780 && activeContent) && <CardDetails activeContent={activeContent} setActiveContent={setActiveContent}  producers={producers} popupPos={popupPos} popupWidth={popup_width} creatorType={creatorType} ref={popup_ref}/>}
      {loaded ? 
      <Swiper
      modules={[Navigation]}
      navigation={{
        nextEl: ".nextNav",
        prevEl: ".prevNav"
      }}
      slidesPerGroup={1}
      slidesPerView={2}
       breakpoints={{
                1300: {
                  slidesPerView: 6,
                  slidesPerGroup: 4
                },
                1024: {
                  slidesPerView: 5,
                  slidesPerGroup: 3
                },
                650: {
                  slidesPerView: 4,
                  slidesPerGroup: 3
                },
                480: {
                  slidesPerView: 3,
                  slidesPerGroup: 2
                }
              }}>
      {data?.map((elem, idx) => {
        return <SwiperSlide key={(elem.mal_id || elem.id)}>
          <div key={elem.mal_id} className='relative flex lg:min-w-fit lg:h-85 h-60 w-[60%]'>
          <div className='w-fit text-lg flex flex-col items-center py-2 mx-3  '>
          <h4 className='line-clamp-1 writing-vertical font-bold grow'>{langChanger(elem)}</h4>
          <h1 className='accent-color font-bold text-3xl'>{idx+1}</h1>
          </div>
          
          <img onClick={() => animeWeb((elem.mal_id || elem.id), elem.type)} onMouseEnter={(e) => {
            let x = e.clientX;
            let y = e.clientY;  
            if (x + popup_width+5 > window.innerWidth) {
              x = e.clientX - popup_width 
            }
            if (y + (popupHeight || 500) > window.innerHeight) {
              y = e.clientY - popupHeight
            }
            setPopupPos({x: x, y: y})
            setActiveContent(elem)
          }} onMouseLeave={() => {
            setActiveContent(null);
            }} src={imageFetcher(elem)}  className='cursor-pointer w-50'  alt={data.title} />
            
            <AdultBadge data={elem} className="absolute top-2 left-15 sm:w-12 sm:h-8 flex justify-center items-center sm:text-lg text-sm sm:font-bold rounded-lg"/>
        </div>
        </SwiperSlide>
      })}
      <Button3 className={`prevNav p-4 h-[50%] absolute top-1/2 -translate-1/2 disabled:bg-black disabled:text-white left-5 z-10`} text="&lt;"/>
      <Button3 className="nextNav p-4 h-[50%] absolute top-1/2 -translate-1/2 disabled:bg-black disabled:text-white -right-6 z-10" text="&gt;"/>
    </Swiper> : <LoadingCards />}
    </div>
  )
}

export default Cards
