import React, { useContext } from 'react'
import { MyCinemaContext } from '../ContextShare/ContextShare'

function TicketBooking() {
  const {selectedCinemaShow} = useContext(MyCinemaContext)
  
  const {selectedMovie,theaterName,showtime,selectedDate} = selectedCinemaShow
  console.log(selectedMovie);
  console.log(theaterName);
  console.log(showtime);
  console.log(selectedDate);

  // console.log(selectedCinemaShow);


  // Convert the selected date to the format "14 January"
  const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
  });


  return (
    <div>
      <div className='d-flex column flex-column  justify-content-center'>
        <h2 className='text-title text-center'>{selectedCinemaShow?.selectedMovie.film_name}</h2>
        <div className='d-flex justify-content-center gap-3'>
          <p>{selectedCinemaShow?.theaterName}</p>
          <p>|</p>
          <p>{selectedCinemaShow?.showtime}</p>
          <p>|</p>
          <p>{formattedDate}</p>
        </div>
      </div>
    </div>
  )
}

export default TicketBooking