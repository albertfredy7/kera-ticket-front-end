import React, { createContext, useState } from 'react'

export const MyLocationContext = createContext()
export const MyMovieDetailsContext = createContext()
export const MyTheaterContext = createContext()

function ContextShare({children}) {
    const [selectedCity,setSelectedCity] = useState('Ernakulam') 
    const [selectedMovie,setSelectedMovie] = useState('')
    const [selectedTheater,setSelectedTheater] = useState([])
  return (
    <div>
<MyTheaterContext.Provider value={{selectedTheater,setSelectedTheater}}>
  <MyMovieDetailsContext.Provider value={{selectedMovie,setSelectedMovie}}>
            <MyLocationContext.Provider value={{selectedCity,setSelectedCity}}>{children}</MyLocationContext.Provider>
    
  </MyMovieDetailsContext.Provider>
</MyTheaterContext.Provider>    </div>
  )
}

export default ContextShare