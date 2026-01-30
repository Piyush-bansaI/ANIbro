import React from 'react'
import ResultCardLoad from './ResultCardLoad'

const ResultLoader = ({className}) => {
  return (
    <div className={`${className}`}>
      <ResultCardLoad/>
      <ResultCardLoad/>
      <ResultCardLoad/>
      <ResultCardLoad/>
      <ResultCardLoad/>
    </div>
  )
}

export default ResultLoader
