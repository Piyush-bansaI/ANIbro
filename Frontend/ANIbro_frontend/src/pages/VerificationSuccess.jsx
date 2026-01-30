import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SignUp } from '../Contexts/SignUpContext'

const VerificationSuccess = () => {
  const {token} = useParams()
  const { getToken } = useContext(SignUp)
  useEffect(() => {
    getToken(token)
  }, [])
  
  return (
    <div className='min-h-screen min-w-full bg-color text-color selection:bg-amber-500/60'>
      <h1 className='text-green-200 text-4xl font-bold capitalize'>successfully signed in!</h1>
    </div>
  )
}

export default VerificationSuccess
