import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../buttons/Button';
import SelectMode from '../SelectMode';
import Search from './Search';
import Button4 from '../buttons/Button4';
import Categories from './Categories';
import { navContext } from '../../Contexts/NavbarContext';
import Profile from '../ProfileComponent/Profile';
import ProfileDetails from '../ProfileComponent/ProfileDetails';
import { typeContext } from '../../Contexts/TypeContext';
import { GiHamburgerMenu } from "react-icons/gi";
import SearchMobile from './SearchMobile';

const Navbar = ({login, search, setSearch, setLogin, searchData, isSearchValid, resultPreview, isCategoriesShown, setIsCategoriesShown, brosData, logout, tabletMode, phoneMode}) => {
    const [mode, setMode,,,langType, setLangType] = useContext(typeContext)
    const [toggleMode1, setToggleMode1] = useState(() => {
      return localStorage.getItem("Mode") === "Manga" ? true : false
    })
    const [toggleMode2, setToggleMode2] = useState(() => {
      return localStorage.getItem("langType") === "japanese" ? true : false
    })
    const [isProfileClicked, setIsProfileClicked] = useState(false)
    const showLogin = () => {
      setLogin(true)
    }
    const [ShowSearchMobile, setShowSearchMobile] = useState(false)
    const profileBtnRef = useRef(null)
    const profileRef = useRef(null)

    useEffect(() => {
      const closeProfile = (e) => {
        if (profileBtnRef.current?.contains(e?.target)) return
        if (!profileRef.current?.contains(e?.target)) {
          setIsProfileClicked(false)
        }
      }
      document.addEventListener("pointerdown", closeProfile)
      
      return () => document.removeEventListener("pointerdown", closeProfile)
    }, [isProfileClicked])

    useEffect(() => {
      setToggleMode1(() => localStorage.getItem("Mode") === "Manga")
    }, [mode])

    const changeMode = () => {
      if (mode === "Manga") {
          localStorage.setItem("Mode", "Anime")
          setMode("Anime")
          setToggleMode1(false)
      } else if (mode === "Anime") {
          localStorage.setItem("Mode", "Manga")
          setMode("Manga")
          setToggleMode1(true)
      }
    }
    const changeLang = () => {
      if (langType === "japanese") {
          localStorage.setItem("langType", "english")
          setLangType("english")
          setToggleMode2(false)
      } else if (langType === "english") {
          localStorage.setItem("langType", "japanese")
          setLangType("japanese")
          setToggleMode2(true)
      }
    }
    

  return (
    <nav className='sticky top-0 z-50  bg-color text-color selection:bg-amber-500/60'>
    <div className='relative bg-color flex justify-between items-center py-7 px-6 '>
      <div className='flex items-center gap-5'>
      {!tabletMode && <button className='text-xl'><GiHamburgerMenu /></button>}
      <Link to="/" className='text-4xl font-bold'>ANI<span className='accent-color'>bro</span></Link>
      </div>
      {phoneMode && <Search search={search} setSearch={setSearch} mode={mode}searchData={searchData} isSearchValid={isSearchValid} resultPreview={resultPreview}/>}
      <div className='flex gap-10 text-xl items-center'>
        {tabletMode && <>
        <SelectMode option1="Ani" option2="Man" title="Select Mode" toggler={toggleMode1} onClick={changeMode}  className=''/>
        <SelectMode option1="En" option2="Jp" title="Select Language" toggler={toggleMode2} onClick={changeLang} className=''/>
        </>}
        {phoneMode && <Button4 onmouseenter={() => setIsCategoriesShown(true)}  text="Categories" className={`p-3 ${isCategoriesShown && "accent-color"}`}/>}
          <div className='flex items-center gap-10'>
            {!phoneMode && <SearchMobile ShowSearchMobile={ShowSearchMobile} setShowSearchMobile={setShowSearchMobile}/>}
            {brosData ? <Profile data={brosData} setIsProfileClicked={setIsProfileClicked} isProfileClicked={isProfileClicked} ref={profileBtnRef}/> :  <Button function={showLogin} text="Login" className="p-2 font-medium"/>}
          </div>
      </div>
      {!phoneMode &&(ShowSearchMobile && <div className='bg-color absolute top-full left-0 w-full p-3'>
           <Search search={search} setSearch={setSearch} mode={mode} searchData={searchData} isSearchValid={isSearchValid} resultPreview={resultPreview} className='w-full'/>
      </div>)}
      {isCategoriesShown && <Categories isCategoriesShown={isCategoriesShown} setIsCategoriesShown={setIsCategoriesShown}/>}
      {brosData && isProfileClicked && <ProfileDetails setIsProfileClicked={setIsProfileClicked} isProfileClicked={isProfileClicked} data={brosData} logout={logout} ref={profileRef}/> }
    </div>
    </nav>
  )
}

export default Navbar
