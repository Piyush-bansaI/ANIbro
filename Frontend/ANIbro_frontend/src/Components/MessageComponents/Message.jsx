import React, { useContext } from 'react'
import { typeContext } from '../../Contexts/TypeContext'
import { IoCloseSharp } from "react-icons/io5";
import { TiTick } from "react-icons/ti";

const Message = ({messages}) => {
  return (
    <div className={`fixed z-60 bottom-0 right-0 p-5 ${messages.length === 0 && 'hidden'} text-color flex flex-col gap-3`}>
        {messages.map(msg => (
            <div key={msg.id} className={`min-w-100 max-w-150 accent-bg-color/80 backdrop-blur-md border border-amber-700 text-color rounded-2xl p-5 flex gap-3 overflow-hidden ${!msg.closeMessage ? 'side-appear': 'side-disappear'}`}>
                {(msg.tick || msg.cross) && <h1 className={` accent-bg-color flex justify-center items-center p-1 rounded-full w-8 h-8`}>
                    {msg.tick && <TiTick className='text-2xl'/>}
                    {msg.cross && <IoCloseSharp className='text-2xl'/>}
                </h1>}
                <h1 className='text-xl font-semibold'>{msg.message}</h1>
                <div className='absolute bottom-0 left-0 animate-shrink h-2 accent-bg-color rounded-xl'></div>
            </div>
        ))}
    </div>
  )
}

export default Message
