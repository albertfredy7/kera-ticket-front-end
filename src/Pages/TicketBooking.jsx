import React, { useContext, useState } from 'react';
import ReactLoading from 'react-loading';
import { MyCinemaContext, MyLocationContext, MySeatContext } from '../ContextShare/ContextShare';
import Seats from '../Components/Seats';
import { db } from '../config';
import { addDoc, collection, doc } from "firebase/firestore";
import { AuthContext } from '../ContextShare/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function TicketBooking() {
  const { selectedCinemaShow } = useContext(MyCinemaContext);
  const { selectedSeat } = useContext(MySeatContext);
  const { selectedCity } = useContext(MyLocationContext);
  const { currentUser } = useContext(AuthContext);

  const { selectedMovie, theaterName, showtime, selectedDate } = selectedCinemaShow;

  // Add a new state variable to track loading status
  const [isLoading, setIsLoading] = useState(false);

  // Convert the selected date to the format "14 January"
  const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
  });

  const navigate = useNavigate();

  const handleConfirm = async () => {
    setIsLoading(true); // Start loading
    try {
      // Add the booking details to the bookings collection
      const bookingDocRef = await addDoc(collection(db, "bookings"), {
        uid: currentUser.uid,
        uname: currentUser.displayName,
        email: currentUser.email,
        movieName: selectedMovie.film_name,
        theaterName,
        showtime,
        selectedDate,
        selectedSeat,
        selectedCity
      });

      // Create a reference to the user's document in the bookings collection
      const userDocRef = doc(db, "users", currentUser.uid);

      // Add the booking details to the orders subcollection of the user's document
      const orderDocRef = await addDoc(collection(userDocRef, "orders"), {
        uid: currentUser.uid,
        uname: currentUser.displayName,
        email: currentUser.email,
        selectedMovie,
        movieName: selectedMovie.film_name,
        theaterName,
        showtime,
        selectedDate,
        selectedSeat,
        selectedCity
      });

      console.log("Booking added with ID: ", bookingDocRef.id);
      console.log("Order added with ID: ", orderDocRef.id);
      setIsLoading(false); // Stop loading after successful operations
      toast.success('Booking Confirmed', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      navigate('/');
    } catch (error) {
      console.log("Error adding booking or order: ", error);
      setIsLoading(false); // Stop loading in case of error
    }
  };

  return (
    <div>
      
      {isLoading ? <div className='loader-container m-5'><ReactLoading type="bars" color="red" height={'10%'} width={'10%'} className='d-flex justify-content-center align-items-center container' /></div> :
      <div className='d-flex column flex-column justify-content-center'>
      <h2 className='text-title text-center'>{selectedMovie.film_name}</h2>
      <ToastContainer />
      <div className='d-flex justify-content-center gap-3'>
        <p>{theaterName}</p>
        <p>|</p>
        <p>{showtime}</p>
        <p>|</p>
        <p>{formattedDate}</p>
      </div>
      <Seats />
      <div className='m-5 w- d-flex justify-content-center align-items-center'>
        {selectedSeat && <button className='btn btn-dark w-50' onClick={handleConfirm}>
          <i className="fa fa-ticket me-2"></i> Confirm Tickets
        </button>}
      </div>
    </div> }
    </div>
  );
}

export default TicketBooking;