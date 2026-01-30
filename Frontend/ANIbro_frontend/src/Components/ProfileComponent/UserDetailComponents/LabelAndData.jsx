import React from 'react'
import { MdVerified } from "react-icons/md";
import { IoIosInformationCircle } from "react-icons/io";

const LabelAndData = ({data, label, discription, showBadge, discriptionClassName}) => {
  return (
    <div className='flex flex-col gap-3'>
            <h1 className='accent-color font-semibold'>{label}</h1>
            <div className='relative w-fit'>
            <div className={`border p-2 w-100  border-white ${discriptionClassName}`}>{discription}</div>
              <div className='absolute right-4 top-1/2 -translate-y-1/2'>  
              {showBadge && (data.isVerified ? <MdVerified className='text-green-500' title='Email is Verified'/> : <IoIosInformationCircle className='accent-color'  title='Email is not Verified'/>)}
              </div>
            </div>
        </div>
  )
}

export default LabelAndData
