import React, { useContext, useEffect, useRef, useState } from 'react'
import Button from './buttons/Button'
import { messageContext } from '../Contexts/MessageContext'

const Pagination = ({page, setPage, pagination}) => {
  const {createMsg} = useContext(messageContext)
  const [currentPage, setCurrentPage] = useState(page)
  const time = useRef(null)
  const nextPage = () => {

    if (time.current) clearTimeout(time.current)
    

    time.current = setTimeout(() => {
      if (pagination?.has_next_page) {
        setCurrentPage(prev => Number(prev) + 1)
        setPage(prev => Number(prev) + 1)
      }
    }, 50);
  }

  const changePage = async (e) => {
    const v = e.target.value
    setCurrentPage(v)

    if (currentPage === '') return
    
    if (time.current) {
      clearTimeout(time.current)
    }

    time.current = setTimeout(() => {
      const val = Number(v)
      if (!Number.isInteger(val)){
        createMsg("it has to be number bro!", 'failed')
        return
      }
      if (val < 1) {
        createMsg("the value must be greater then 1!", 'failed')
        return
      }
      setPage(val)
    }, 500);
  }

  const prevPage = () => {
    if (time.current) clearTimeout(time.current) 
    
    time.current = setTimeout(() => {
      if (pagination.current_page !== 1) {
        setCurrentPage(prev => Number(prev) - 1)
        setPage(prev => Number(prev) - 1)
      }
    }, 50);
  }
  return (
    <div className='flex justify-center text-color mb-5 gap-2'>
        <Button disabled={pagination?.current_page === 1} title={pagination?.current_page !== 1 ? 'Previous page': 'No Previous page'} function={prevPage} text="&lt;" className='p-2 px-3 text-2xl'/>

        <input type="text" min={1} className='text-color border border-white/40 rounded w-12 py-auto text-xl outline-none text-center' value={currentPage} onChange={(e) => {
          changePage(e)
        }}/>

        <Button disabled={!pagination?.has_next_page} title={pagination?.has_next_page? 'Next page': 'No Next page'} function={nextPage} text="&gt;" className='p-2 px-3 text-2xl'/>
      </div>
  )
}

export default Pagination
