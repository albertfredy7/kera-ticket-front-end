import React from 'react'
import Movies from '../Components/Movies'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import AuthWrapper from '../Components/AuthWrapper'

function NearMovies() {
  return (
    <AuthWrapper>
      <div>
        <Header />
        <Movies />
        <Footer />
      </div>
    </AuthWrapper>
  )
}

export default NearMovies