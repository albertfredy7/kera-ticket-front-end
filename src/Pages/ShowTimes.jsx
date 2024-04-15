import React, { useContext, useEffect, useState } from 'react';
import { MyCinemaContext, MyLocationContext, MyMovieDetailsContext, MyTheaterContext } from '../ContextShare/ContextShare';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import AuthWrapper from '../Components/AuthWrapper';

function ShowTimes() {
  const { selectedCity } = useContext(MyLocationContext);
  const { selectedMovie } = useContext(MyMovieDetailsContext);
  const { selectedTheater, setSelectedTheater } = useContext(MyTheaterContext);
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTheaterData, setSelectedTheaterData] = useState([]);
  const [selectedShowtimeData, setSelectedShowtimeData] = useState(null);
  const { selectedCinemaShow, setSelectedCinemaShow } = useContext(MyCinemaContext)
  const { id } = useParams()



  console.log(id);


  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://keraserver-1.onrender.com/showTimes');
        setSelectedTheater(response.data);
      } catch (error) {
        console.error(error); // Handle any errors here
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const selectedMovieId = selectedMovie.film_id;
    const selectedCityData = selectedTheater[selectedCity];
    const theatersShowingMovie = selectedCityData?.filter((theater) => {
      return theater.filmsShowing && theater.filmsShowing.includes(selectedMovieId);
    });

    setSelectedTheaterData(theatersShowingMovie);
  }, [selectedCity, selectedMovie, selectedTheater]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleShowtimeClick = (theaterName, showtime) => {
    console.log(selectedMovie);
    console.log(selectedCity);
    console.log('Theater:', theaterName);
    console.log('Showtime:', showtime);
    console.log(selectedDate);
    const showtimeData = {
      selectedMovie,
      selectedCity,
      selectedDate,
      theaterName,
      showtime,
    };

    setSelectedShowtimeData(showtimeData);
    setSelectedCinemaShow(showtimeData)
    navigate(`/movies/${id}/showtimes/tickets`)

    // You can do something with the selected information, e.g., store it in state or make an API call
  };
  console.log(selectedCinemaShow);
  //   console.log(selectedShowtimeData);

  const getDateCards = () => {
    const today = new Date();
    const dateCards = [];

    for (let i = 0; i < 6; i++) {
      const date = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + i));

      const options = { weekday: 'short', day: 'numeric', month: 'short' };
      const formattedDate = date.toLocaleDateString('en-US', options);

      const isToday = i === 0; // Check if it's today's date

      dateCards.push(
        <div
          key={i}
          className={`date-card mt-2 mb-2  
                    ${selectedDate === date.toISOString().split('T')[0] ? 'bg-dark text-white' : 'border border-dark'}
                    ${isToday ? 'border-dark' : ''}`}
          style={{ cursor: 'pointer', padding: '5px', borderRadius: '1px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40px' }}
          onClick={() => handleDateClick(date.toISOString().split('T')[0])}
        >
          <div>{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
          <div>{date.toLocaleDateString('en-US', { day: 'numeric' })}</div>
          <div>{date.toLocaleDateString('en-US', { month: 'short' })}</div>
        </div>
      );
    }

    return dateCards;



  };

  return (
    <AuthWrapper>
      <div>
        <Header />
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='d-flex justify-content-center flex-row flex-wrap gap-2 mt-5 mb-2'>
                {getDateCards()}
              </div>
              <hr className='w-100' />
              <div className='d-flex justify-content-center flex-wrap gap-3 mb-5 mt-5'>
                {selectedTheaterData?.length > 0 ? (
                  selectedTheaterData.map((theater, index) => (
                    <div className='card p-3 ' key={index} style={{ minWidth: '200px', maxWidth: '300px' }}>
                      <h5 className='text-center'>{theater.name}</h5>
                      <hr />
                      <div className='d-flex flex-row mt-3 gap-3'>
                        {/* Replace theater.showtimes.map with your predefined array of showtimes */}
                        {['10:00 AM', '1:00 PM', '7:00 PM'].map((showtime, showtimeIndex) => (
                          <p
                            key={showtimeIndex}
                            className='border border-success border-2 p-2 rounded'
                            onClick={() => handleShowtimeClick(theater.name, showtime)}
                            style={{ cursor: 'pointer' }}
                          >
                            {showtime}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='text-center'>
                    <img src="https://i.pinimg.com/originals/8c/10/f1/8c10f1a675f4172aa88332f6c4b1ac9e.gif" alt="" />
                    <p>Currently no shows available for this movie</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </AuthWrapper>
  );
}

export default ShowTimes;
