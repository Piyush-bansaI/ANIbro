import React, { useState } from 'react'
import { MdArrowDropDown } from "react-icons/md";

const Qna = ({question, answer}) => {
    const [isAnswerShown, setIsAnswerShown] = useState(false)

    const showAnswer = () => {
        setIsAnswerShown(!isAnswerShown)
    }
  return (
    <div className='my-5'>
      <div onClick={showAnswer} className='text-4xl accent-color p-4 font-bold bg-gray-700/70 hover:bg-gray-700 flex'><span className='grow'>{question}</span><MdArrowDropDown className={`text-white -rotate-90 ${isAnswerShown && "rotate-0 transition-transform"}`}/></div>
      <div className={`p-5 text-lg bg-gray-800 ${!isAnswerShown && "hidden"}`}>
        {answer} 
      </div>
    </div>
  )
}

export default Qna
