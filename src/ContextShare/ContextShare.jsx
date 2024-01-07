import React, { createContext, useState } from 'react'

export const MyLocationContext = createContext()
export const MyMovieDetailsContext = createContext()
export const MyTheaterContext = createContext()
export const MyCinemaContext = createContext()

function ContextShare({children}) {
    const [selectedCity,setSelectedCity] = useState('Ernakulam') 
    const [selectedMovie,setSelectedMovie] = useState('')
    const [selectedTheater,setSelectedTheater] = useState([])
    const [selectedCinemaShow,setSelectedCinemaShow] = useState(null)
  return (
    <div>
<MyCinemaContext.Provider value={{selectedCinemaShow,setSelectedCinemaShow}}>
  <MyTheaterContext.Provider value={{selectedTheater,setSelectedTheater}}>
    <MyMovieDetailsContext.Provider value={{selectedMovie,setSelectedMovie}}>
              <MyLocationContext.Provider value={{selectedCity,setSelectedCity}}>{children}</MyLocationContext.Provider>
      
    </MyMovieDetailsContext.Provider>
  </MyTheaterContext.Provider> 
</MyCinemaContext.Provider>   </div>
  )
}

export default ContextShare