import React, { useContext } from 'react'
import Button4 from '../buttons/Button4'
import { typeContext } from '../../Contexts/TypeContext'

const TitleNav = ({showCurrentData, setShowCurrentData, data}) => {
  const [mode] = useContext(typeContext)
  return (
    <nav className='bg-gray-800 flex gap-3'>
      <Button4 onclick={() => setShowCurrentData("overview")} text="Overview" className="p-3 px-4"/>
      <Button4 onclick={() => setShowCurrentData("details")} text="Details" className="p-3 px-4"/>
      {(mode !== "Manga" && data?.streaming?.length != 0) && <Button4 onclick={() => setShowCurrentData("whereToWatch")} text="Where to watch" className="p-3 px-4"/>}
    </nav>
  )
}

export default TitleNav
