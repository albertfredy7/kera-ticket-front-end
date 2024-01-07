import React, { useState } from 'react';

const Seats = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const selectSeat = (seat) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seat)) {
        return prevSelectedSeats.filter((selectedSeat) => selectedSeat !== seat);
      } else {
        return [...prevSelectedSeats, seat];
      }
    });
  };

  const createSeats = (isRightContainer) => {
    const seats = [];
    const categories = ['A', 'B', 'C', 'D'];
    const seatNumbers = Array.from({ length: 12 }, (_, index) => index + 1);

    for (const category of categories) {
      for (let i = 0; i < seatNumbers.length; i++) {
        let seatNumber;
        if (isRightContainer) {
          seatNumber = seatNumbers[i] + 12; // Start from 13 for the right container
        } else {
          seatNumber = seatNumbers[i];
        }

        const isTenthSeat = (i + 1) % 10 === 0;

        seats.push(
          <div
            key={`${category}${seatNumber}`}
            className={`seat ${selectedSeats.includes(`${category}${seatNumber}`) ? 'selected' : ''} ${isTenthSeat ? 'tenth-seat' : ''}`}
            onClick={() => selectSeat(`${category}${seatNumber}`)}
          >
            {category}
            {seatNumber}
          </div>
        );
      }

      // Add a line break after every 24 seats (length of seatNumbers array)
      seats.push(<br key={`br-${category}`} />);
    }

    return seats;
  };

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

          .seat.booked {
            background-color: lightgray;
            color: white;
            pointer-events: none; /* Disable clicking on booked seats */
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
      <div className="split-container d-flex justiify-content-center container">
        <div className="seat-container container">{createSeats(false)}</div>
        <div className="seat-container container">{createSeats(true)}</div>
      </div>
      <div>
      <div class="screen container  mt-5 mb-3"  >
      </div>
      <h6 className="text-center mb-5">SCREEN</h6>
      </div>
    </div>
  );
};

export default Seats;
