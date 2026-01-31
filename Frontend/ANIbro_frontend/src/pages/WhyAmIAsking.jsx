import React from 'react'
import Qna from '../Components/Qna'
import qna from '../json/qna.json'

const WhyAmIAsking = () => {
  return (
    <div className='min-h-[calc(100vh-81px)] w-full bg-color text-color p-3'>
        <h1 className='p-5 text-4xl font-bold accent-color'>Questions</h1>
      {qna.map((elem, idx) => <Qna question={elem.question} key={idx} answer={elem.answer}/>)}
    </div>
  )
}

export default WhyAmIAsking
