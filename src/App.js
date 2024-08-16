
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Pages/Home';
import MovieDetails from './Pages/MovieDetails';
import NearMovies from './Pages/NearMovies';
import Orders from './Pages/Orders';
import ShowTimes from './Pages/ShowTimes';
import Theatres from './Pages/Theatres';
import TicketBooking from './Pages/TicketBooking';

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
