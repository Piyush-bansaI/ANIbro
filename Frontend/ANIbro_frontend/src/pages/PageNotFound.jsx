import React, { useEffect } from 'react'
import error from '../assets/images/naruto.png'
import { useNavigate } from 'react-router-dom';
import Button from '../Components/buttons/Button';


const PageNotFound = () => {
    const nav = useNavigate()

    const goBack = () => {
        nav("/")
    }

    useEffect(() => {
      document.title = "404 Not Found | ANIbro";
    }, [])
    

  return (
    <div className='min-h-[calc(100vh-81px)] w-full bg-color text-color flex flex-col justify-center items-center gap-5'>
      <img src={error} width={200}  alt="" />
      <h1 className='text-4xl font-bold'><span className='accent-color'>404</span> - Not Found!</h1>
      <Button function={goBack} text="Go to Homepage" showLogo={true} className="p-4 text-3xl font-semibold"/>
    </div>
  )
}

export default PageNotFound
