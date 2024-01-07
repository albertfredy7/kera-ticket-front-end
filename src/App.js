
import './App.css';
import Header from './Components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import NearMovies from './Pages/NearMovies';
import Footer from './Components/Footer';
import Theatres from './Pages/Theatres';
import MovieDetails from './Pages/MovieDetails';
import ShowTimes from './Pages/ShowTimes';
import TicketBooking from './Pages/TicketBooking';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/movies" element={<NearMovies/>}/>
        <Route path='/theatres' element={<Theatres/>}/>
        <Route path='/movies/:id' element={<MovieDetails/>}/>
        <Route path='/movies/:id/showtimes' element={<ShowTimes/>}/>
        <Route path='/movies/:id/showtimes/tickets' element={<TicketBooking/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
