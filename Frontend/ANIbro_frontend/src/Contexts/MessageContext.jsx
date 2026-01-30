import React, { createContext, useEffect, useState } from 'react'
import Message from '../Components/MessageComponents/Message'
export const messageContext = createContext()

const MessageContext = ({children}) => {
    const [messages, setMessages] = useState([])

    const createMsg = (text, type) => {
        const id = Date.now()

        setMessages(prev => [...prev, {
            id: id,
            message: text,
            closeMessage: false,
            tick: type === "success", 
            cross: type !== "success", 
        }])

        const closeMessage = setTimeout(() => {
            setMessages(prev => prev.map(msg => msg.id === id ? {...msg, closeMessage: true} : msg))

            const removeMessage = setTimeout(() => {
                setMessages(prev => prev.filter(msg => msg.id !== id))
            }, 300);
            return () => clearTimeout(removeMessage)
        }, 5000);
        return () => clearTimeout(closeMessage)
    }
    

  return (
    <messageContext.Provider value={{createMsg}}>
        <Message messages={messages}/>
      {children}
    </messageContext.Provider>
  )
}

export default MessageContext
