
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
import Register from './Components/Register';
import Login from './Components/Login';
import Orders from './Pages/Orders';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/movies" element={<NearMovies/>}/>
        <Route path='/theatres' element={<Theatres/>}/>
        <Route path='/movies/:id' element={<MovieDetails/>}/>
        <Route path='/movies/:id/showtimes' element={<ShowTimes/>}/>
        <Route path='/movies/:id/showtimes/tickets' element={<TicketBooking/>}/>
        <Route path='/orders' element={<Orders/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
