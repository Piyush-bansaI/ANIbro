import "swiper/css";
import "swiper/css/navigation";
import React, { useContext, useEffect, useState } from 'react'
import Button from './buttons/Button'
import {Swiper, SwiperSlide}from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import Button2 from './buttons/Button2';
import Button3 from './buttons/Button3';
import TypeAndEpisodes from "./CardComponents/TypeAndEpisodes";
import { typeContext } from "../Contexts/TypeContext";
import LoadingBanner from "./LoadingComponents/Banner/LoadingBanner";
import { moreData } from "../Contexts/MoreInfoContext";
import { profilePicture } from "../Contexts/ProfilePicContext";

const Slide = ({topAnimeBanner, loaded}) => {
    const [mode, setMode, imageFetcher,,,,langChanger] = useContext(typeContext)
    const [ animeWeb ] = useContext(moreData)
    const {changePic, selectedImg, saveProfilePic, brosData, setBrosData, brosGenres, ToggleLogin, setToggleLogin, saveData} = useContext(profilePicture)
  return (
    <div className='flex relative md:h-150 h-100 lg:h-200 overflow-hidden'>
    { loaded ? <Swiper 
    modules={[Autoplay, Navigation]}
    
    loop={true}
    autoplay={{
        delay: 4000,
        disableOnInteraction: false
    }}
    navigation={{
        prevEl: ".prev-btn",
        nextEl: ".next-btn"
    }}>
      {topAnimeBanner?.map((elem, idx) => {
            return <SwiperSlide>
            {loaded ?
            <div key={idx} className={`min-w-full flex h-full relative transition-transform`}>
                <div className='absolute w-[110%] h-70 top-[90%] blur-2xl -rotate-1 bg-color z-10'></div>
                <div className='absolute w-[110%] h-70 bottom-[93%] blur-2xl rotate-1 bg-color z-10'></div>
            <div className='md:grow relative md:w-[40%] w-[60%] '>
                <div className='absolute w-[110%] md:w-[120%] h-[130%] top-1/2 -translate-y-1/2 blur-2xl bg-color z-10'></div>
                <div className='relative z-10 flex flex-col justify-center h-full px-5'>
                    <span className='accent-color'>#Top {idx+1}</span>
                    <h1 className='lg:text-[3.5vw] text-3xl font-bold sm:line-clamp-2 line-clamp-1 leading-tighter md:mb-0 mb-3'>{langChanger(elem)}</h1>
                    {/*Discription*/}
                    <div className={`text-gray-100/80 my-4 w-[90%] lg:line-clamp-3 md:line-clamp-2 hidden`}>{elem.synopsis}</div> 
                    <TypeAndEpisodes data={elem}/>
                    <div className='mt-7 w-fit flex gap-3 items-center flex-wrap'>
                        <Button function={() => saveData(elem)} text="Add in list" className="lg:p-4 p-3 text-white w-fit h-fit font-bold lg:text-xl text-md" showLogo={true}/>
                        <Button2 function={() => {animeWeb(elem.mal_id, elem.type)}} text="More Details" className='lg:text-lg text-sm'/>
                    </div>
                </div>
            </div>
            <img src={imageFetcher(elem)} className='object-cover object-center right-0 w-[60%] md:relative absolute contrast' alt={elem.title} />
        </div> : <LoadingBanner />}
        </SwiperSlide> 
    })}
    </Swiper> : <LoadingBanner /> }
    <div className='absolute z-20 right-2 gap-3 top-1/2 flex flex-col -translate-y-1/2'>
        <Button3 className="prev-btn p-2" text="&lt;"/>
        <Button3 className="next-btn p-2" text="&gt;"/>
    </div>
    </div>  
  )
}

export default Slide
