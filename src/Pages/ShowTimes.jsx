import React, { useContext, useEffect, useState } from 'react';
import { MyLocationContext, MyMovieDetailsContext, MyTheaterContext } from '../ContextShare/ContextShare';
import axios from 'axios';

function ShowTimes() {
    const { selectedCity } = useContext(MyLocationContext);
    const { selectedMovie } = useContext(MyMovieDetailsContext);
    const { selectedTheater, setSelectedTheater } = useContext(MyTheaterContext);
    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedTheaterData, setSelectedTheaterData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/showTimes');
                setSelectedTheater(response.data);
            } catch (error) {
                console.error(error); // Handle any errors here
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Store the film id from the selected movie
        const selectedMovieId = selectedMovie.film_id;

        // Filter the theaters in the selected city
        const selectedCityData = selectedTheater[selectedCity];

        // Filter theaters based on film id
        const theatersShowingMovie = selectedCityData?.filter(theater => {
            return theater.filmsShowing && theater.filmsShowing.includes(selectedMovieId);
        });

        // Update the state with the filtered theaters
        setSelectedTheaterData(theatersShowingMovie);

        console.log(selectedTheaterData);
    }, [selectedCity, selectedMovie, selectedTheater]);

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

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
    console.log(selectedDate);
    console.log(selectedMovie);
    console.log(selectedCity);
    console.log(selectedTheater);
    console.log(selectedTheaterData);

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='d-flex justify-content-center flex-row flex-wrap gap-2 mt-5 mb-2'>
                            {getDateCards()}
                            
                        </div>
                        <hr className='w-100' />
                        {/* Display theaters showing the selected movie */}
                        <div className='d-flex justify-content-center flex-wrap gap-3 mb-5 mt-5'>
                            {selectedTheaterData?.map((theater, index) => (
                                <div className='card p-3 ' key={index} style={{ minWidth: '200px', maxWidth: '300px' }}>
                                    <h5 className='text-center'>{theater.name}</h5>
                                    <hr />
                                    <div className='d-flex flex-row mt-3 gap-3'>
                                        <p className='border border-success border-2 p-2 rounded '>10.00am</p>
                                        <p className='border border-success border-2 p-2 rounded '>1.00pm</p>
                                        <p className='border border-success p-2 border-2  rounded'>7.00pm</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowTimes;
