import React, { useContext, useEffect, useState } from 'react';
import { MyCinemaContext, MyLocationContext, MySeatContext } from '../ContextShare/ContextShare';
import { db } from '../config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import ReactLoading from 'react-loading';

const Seats = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const {selectedSeat,setSelectedSeat} = useContext(MySeatContext)
  const { selectedCinemaShow } = useContext(MyCinemaContext);
  const { selectedCity } = useContext(MyLocationContext);
  const [isLoading, setIsLoading] = useState(true);

  const [fetchedSeats, setFetchedSeats] = useState([]);
  const { selectedMovie, theaterName, showtime, selectedDate } = selectedCinemaShow;
  console.log(selectedMovie.film_name);

  const selectSeat = (seat) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seat)) {
        const updatedSeats = prevSelectedSeats.filter((selectedSeat) => selectedSeat !== seat);
        setSelectedSeat(updatedSeats); // Update the context value
        return updatedSeats;
      } else {
        const updatedSeats = [...prevSelectedSeats, seat];
        setSelectedSeat(updatedSeats); // Update the context value
        return updatedSeats;
      }
    });
  };

  const createSeats = (isRightContainer) => {
    const seats = [];
    const categories = ['A', 'B', 'C', 'D'];
    const seatNumbers = Array.from({ length:  12 }, (_, index) => index +  1);
  
    for (const category of categories) {
      for (let i =  0; i < seatNumbers.length; i++) {
        let seatNumber;
        if (isRightContainer) {
          seatNumber = seatNumbers[i] +  12; // Start from  13 for the right container
        } else {
          seatNumber = seatNumbers[i];
        }
  
        const isTenthSeat = (i +  1) %  10 ===  0;
        const seatKey = `${category}${seatNumber}`;
  
        seats.push(
          <div
            key={seatKey}
            className={`seat ${selectedSeats.includes(seatKey) ? 'selected' : ''} ${isTenthSeat ? 'tenth-seat' : ''} ${fetchedSeats.includes(seatKey) ? 'booked' : ''}`}
            onClick={() => selectSeat(seatKey)}
          >
            {category}
            {seatNumber}
          </div>
        );
      }
  
      // Add a line break after every  24 seats (length of seatNumbers array)
      seats.push(<br key={`br-${category}`} />);
    }
    console.log(selectedSeat);
  
    return seats;
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingsCollectionRef = collection(db, 'bookings');
        const q = query(
          bookingsCollectionRef,
          where('selectedCity', '==', selectedCity),
          where('theaterName', '==', theaterName),
          where('movieName', '==', selectedMovie.film_name),
          where('selectedDate', '==', selectedDate),
          where('showtime', '==', showtime)
        );
        const querySnapshot = await getDocs(q);
        const fetchedBookings = [];
        querySnapshot.forEach((doc) => {
          fetchedBookings.push(doc.data());
        });
        const allSelectedSeats = fetchedBookings.flatMap(booking => booking.selectedSeat);
        setFetchedSeats(allSelectedSeats); // Update the new state with fetched seats
      } catch (error) {
        console.error("Error fetching bookings: ", error);
      }finally {
        setIsLoading(false);
       } // Set loading to false after fetching
    };

    fetchBookings();
  }, []);
  console.log(fetchedSeats);

  return (
    <div>
      <style>
        {`.tenth-seat {
            margin-right: 50px;
          }

          .seat-container {
            margin-top: 60px;
            display: flex;
            flex-wrap: wrap;
            gap: 5px; /* Adjust the gap as needed */
          }

          .seat {
            width: 40px; /* Adjust the width as needed */
            height: 40px; /* Adjust the height as needed */
            margin: 2px;
            padding: 5px;
            cursor: pointer;
            border: 1px solid #ccc; /* Add border style here */
            box-sizing: border-box; /* Include padding and border in element's width and height */
          }

          .seat.selected {
            background-color: black;
            color: white;
          }
          .selected{
            width: 40px; /* Adjust the width as needed */
            height: 40px; /* Adjust the height as needed */
            margin: 2px;
            padding: 5px;
            cursor: pointer;
            border: 1px solid #ccc; /* Add border style here */
            box-sizing: border-box; /* Include padding and border in element's width and height */
            background-color: black;
            

          }

          .seat.booked {
            background-color: lightgray;
            color: white;
            pointer-events: none; /* Disable clicking on booked seats */
          }

          .booked{
            width: 40px; /* Adjust the width as needed */
            height: 40px; /* Adjust the height as needed */
            margin: 2px;
            padding: 5px;
            cursor: pointer;
            border: 1px solid #ccc; /* Add border style here */
            box-sizing: border-box; /* Include padding and border in element's width and height */
            background-color: lightgray;
          }

          .booking-details {
            margin-top: 20px;
            text-align: center;
          }

          .screen {
            background-color: #3498db;
            height: 10px;
            opacity: 0.5;
          }

          .split-container {
            display: flex;
            flex-wrap: wrap;
            gap: 2px; /* Adjust the gap as needed */
          }

          .split-container .seat-container {
            width: 49%;
          }
        `}
      </style>
      {isLoading ? (
        <div className='loader-container m-5'>
        <ReactLoading type="bars" color="red" height={'10%'} width={'10%'} className='d-flex justify-content-center align-items-center container' />
    </div>
      ) : (
        <>
          <div className="split-container d-flex justiify-content-center container">
            <div className="seat-container container">{createSeats(false)}</div>
            <div className="seat-container container">{createSeats(true)}</div>
          </div>
          <div>
            <div class="screen container  mt-5 mb-3"></div>
            <h6 className="text-center mb-5">SCREEN</h6>
            <div className='d-flex justify-content-center align-items-center flex-row gap-3'>
              <div className=' d-flex justify-content-center align-items-center gap-2'>
                <div className='seat' style={{width:"30px",height:"30px"}} ></div>
                <h6>Available</h6>
              </div>
              <div className='d-flex justify-content-center align-items-center gap-2'>
                <div className='selected'style={{width:"30px",height:"30px"}} ></div>
                <h6>Selected</h6>
              </div>
              <div className='d-flex justify-content-center align-items-center gap-2'>
                <div className='booked' style={{width:"30px",height:"30px"}}></div>
                <h6>Sold</h6>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Seats;