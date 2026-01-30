import SavedCard from "./SavedCard"


const ShowSavedData = ({data}) => {

  return (
    <div className='card-grid place-items-center'>
      {data?.map((elem, idx) => {
        return <SavedCard  key={elem.mal_id || idx} elem={elem} idx={idx}/>
      })}
    </div>
  )
}

export default ShowSavedData
