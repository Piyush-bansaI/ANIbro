import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound'
import Signup from './pages/Signup'
import MoreInfo from './pages/MoreInfo'
import { useContext } from 'react'
import { typeContext } from './Contexts/TypeContext'
import WhyAmIAsking from './pages/WhyAmIAsking'
import VerifyEmail from './pages/VerifyEmail'
import VerificationSuccess from './pages/VerificationSuccess'
import BroProfile from './pages/BroProfile'
import { navContext } from './Contexts/NavbarContext'
import ChangeProfile from './pages/ChangeProfile'
import SearchData from './pages/SearchData'
import ShowCategories from './pages/ShowCategories'

const App = () => {
  const data = useContext(navContext)
  const type = useContext(typeContext)

  const brosData = data[6]
  const mode = type[0] ?? 'Anime'
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path={`/${mode}/:data`} element={<MoreInfo/>}/>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/verify'>
        <Route path='pending' element={<VerifyEmail />}/>
        <Route path=':token' element={<VerificationSuccess />}/>
      </Route>
      <Route path={`/${mode}/genres`} element={<ShowCategories/>}/>
      {brosData && <Route path='/profile/:id' element={<BroProfile/>}/>}
      <Route path='/profile-change' element={<ChangeProfile />}/>
      <Route path='/questions' element={<WhyAmIAsking />}/>
      <Route path={`/${mode}/q`} element={<SearchData />}/>
      <Route path='*' element={<PageNotFound />}/>
    </Routes>
  )
}

export default App
