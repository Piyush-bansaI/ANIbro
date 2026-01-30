import React from 'react'
import Cards from './Cards'
import LoadingCards from '../LoadingComponents/Card/LoadingCards'

const CardSwiper = (props) => {
  return (
    <div className='my-5'>
  {props.loaded ? <>
    <h1 className='accent-color font-bold lg:text-[1.5vw] px-5'>{props.text}</h1>
    <Cards data={props?.topAnime} loaded={props.loaded}/>
  </> : <LoadingCards/>}
  </div>
  )
}

export default CardSwiper
