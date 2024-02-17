import React, { useContext } from 'react'
import { AuthContext } from '../ContextShare/AuthContext'


function Home() {
  const { currentUser } = useContext(AuthContext)
  console.log(currentUser);
  return (
    <div>
      <h2>Welcome {currentUser?.displayName}</h2>
    </div>
  )
}

export default Home