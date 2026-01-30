import React, { useContext } from 'react'
import ChooseGenres from './ChooseGenres'
import Button3 from '.././buttons/Button3'
import Button4 from '.././buttons/Button4'

const SelectGenres = ({isTicked, toggleGenre, submitGenre}) => {
  
  return (
    <div className='text-white fixed z-60 w-full h-screen selection:bg-amber-400/40'>
        <div className='bg-black/30 backdrop-blur-sm absolute w-full h-full'></div>
        <div className='relative flex flex-col p-5'>
            <div className='text-center'>
                <h1 className='font-bold text-[3vw]'>Select Genres</h1>
            </div>
            <ChooseGenres/>
            <div className='h-full flex justify-end items-center py-2 gap-5'>
            <Button4 onclick={toggleGenre} text='skip' className="w-fit"/>
            <Button3 function={submitGenre} text='Save Genres' className="w-fit border accent-color px-20 disabled:bg-black disabled:text-amber-400 disabled:cursor-not-allowed" title={isTicked.length === 0 ? 'Choose the Genre 1st': 'You are good to go'} disable={isTicked.length === 0}/>
            </div>
        </div>
    </div>
  )
}

export default SelectGenres
