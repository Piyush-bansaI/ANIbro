import React, { createContext, useContext, useEffect, useState } from 'react'
import { typeContext } from './TypeContext'
import { netContext } from './NetworkContext'
import SuperLogin from "../pages/SuperLogin"
import { fetchAnime } from '../json/fetchAnime';
import { fetchManga } from '../json/fetchManga';
import { dataFetch } from './Fetcher'
import { useLocation, useNavigate } from 'react-router-dom'
import Categories from '../Components/Navbars/Categories'
import { SignUp } from './SignUpContext'
import { messageContext } from './MessageContext'
import { profilePicture } from './ProfilePicContext'
import Navbar from '../Components/Navbars/Navbar';
import { allGenres } from './GenreContext';
export const navContext = createContext()

const NavbarContext = ({children}) => {
  const [mode, setMode, imageFetcher, jiken, langType, setLangType, langChanger, backend_URL, setUserDataRefresh, userDataRefresh, loc, nav,isAdult, setIsAdult, showhentai] = useContext(typeContext)
  const {user, setUser, email, setEmail, pass, setPass, signUp, message, passwordStrength, getToken, usernameAvilable, dataSender, isLoggedIn, setIsLoggedIn, token} = useContext(SignUp)
  const {createMsg} = useContext(messageContext)
  const {isTicked, setIsTicked, tick, showGenre, setShowGenre, toggleGenre, submitGenre, showMoreGenres, showAboutGenre, isCategoriesShown, setIsCategoriesShown} = useContext(allGenres)
  // put nav or not
  const [removeNav, setRemoveNav] = useState(false)
  const [animeError, setAnimeError, mangaError, setMangaError] = useContext(netContext)
  const [topAnimeBanner, topMangaBanner, topAnime, topManga, otherTopAnimes, otherTopMangas, isLoaded, setIsLoaded, captalizeWord, removeDuplicates] = useContext(dataFetch)
  const {changePic, selectedImg, saveProfilePic, brosData, setBrosData, brosGenres, ToggleLogin, setToggleLogin} = useContext(profilePicture)
  // login Variables
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginMessage, setLoginMessage] = useState('e')
  // search components
  const [search, setSearch] = useState("")
  const [isSearchValid, setIsSearchValid] = useState(true)
  const [resultPreview, setResultPreview] = useState(null)

  /**
   * Functions
   */

  const login = async (e) => {
    e.preventDefault()
    const timer = setTimeout(() => {
        setLoginMessage('e');
      }, 5000);

    if (username.trim() === "" || password.trim() === "") {
      setLoginMessage("Please write something before proceeding")
      timer
    } else {

      try {
      const getData = await backend_URL.post("/auth/login", {
        username,
        password
      })


      if (getData.data.message === 'Successfully logged in, welcome back bro!'){
        setToggleLogin(false)
        createMsg(getData.data.message, "success");
        setIsLoggedIn(true)
        localStorage.setItem('userLogin', JSON.stringify(true))
        setUserDataRefresh(prev => prev+1)
        setUsername("")
        setPassword("")
      }
        
      } catch (error) {
        if (error.response) {
          setLoginMessage(error.response.data.message || 'Something went wrong bro')
          createMsg(error.response.data.message, "failed");
          timer
        } else {
          console.log("err: ", error)
        }
      }

    }
  }
  
  const searchData = async (e) => {
    e.preventDefault()
    if (search.length === 0) {
      setIsSearchValid(false)
      setTimeout(() => {
        setIsSearchValid(true)
      }, 3000);
      return
    }

    nav(`/${mode}/q?name=${search}`)
    setSearch('')
  }

  const logout = async () => {
     await backend_URL.post("/user/logout").then((res) => {
      setBrosData(null)
      sessionStorage.removeItem("recommended-anime")
      sessionStorage.removeItem("recommended-manga")
      createMsg(res.data.message, "success");
      localStorage.setItem('userLogin', JSON.stringify(false))
      setIsLoggedIn(false)
      setUserDataRefresh(prev => prev + 1)
     }).catch((err) => {
      console.log(err.response.data)
     })
  }


  /**
   * Use Effects
   */

  // Search
  useEffect(() => {
    if (search.trim() === "") {setResultPreview(null); return}
      
    const getSearchData = setTimeout(async () => {
      try {

        const fetchMode = mode === "Anime" ? fetchAnime : fetchManga
        const getSearch = await jiken.get(fetchMode.searchPrev(search.toLowerCase(), showhentai))

        if (getSearch.status === 200) {
          
          setResultPreview(removeDuplicates(getSearch.data.data))
        } else {
          setResultPreview("No Data Found")
        }
      } catch (error) {
        console.log("err", error)
      }
    }, 700)
    return () => clearTimeout(getSearchData)
  }, [search, mode])

  useEffect(() => {
    setRemoveNav(loc.pathname === "/signup" || loc.pathname.startsWith(`/verify/`))
  }, [loc.pathname])
   
  // gets the user data
  useEffect(() => {
    backend_URL.get('/user/userData', {withCredentials: true}).then((res) => {
      if (res.data.message === 'user not logged in') {
        setBrosData(null);
        localStorage.setItem('userLogin', JSON.stringify(false))
      } else {
        setBrosData(res?.data.broData)
      }

    }).catch((err) => {
      if (err.response.status === 401) {
        setBrosData(null); return
      } else {
        console.log(err)
        createMsg("Something went wrong")
      }
    })
  }, [userDataRefresh])

  return (
    <navContext.Provider  value={[removeNav, setRemoveNav, search, setSearch, isCategoriesShown, setIsCategoriesShown, brosData, showhentai]}>
      {!removeNav && <Navbar  login={ToggleLogin} setLogin={setToggleLogin} searchData={searchData} search={search} setSearch={setSearch} isSearchValid={isSearchValid} resultPreview={resultPreview} isCategoriesShown={isCategoriesShown} setIsCategoriesShown={setIsCategoriesShown} brosData={brosData} logout={logout} tabletMode={window.innerWidth > 855} phoneMode={window.innerWidth > 650}/>}
      
      {ToggleLogin && <SuperLogin name={username} setName={setUsername} password={password} setPassword={setPassword} login={login} ToggleLogin={ToggleLogin} setToggleLogin={setToggleLogin} loginMessage={loginMessage}/>}
        {children}
    </navContext.Provider>
  )
}

export default NavbarContext
