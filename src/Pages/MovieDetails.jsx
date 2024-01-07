import React, { useContext, useEffect, useState } from 'react';
import { MyMovieDetailsContext } from '../ContextShare/ContextShare';
import ReactPlayer from 'react-player';
import { Modal, Button } from 'react-bootstrap';
import {useNavigate } from 'react-router-dom';



function MovieDetails() {
    const navigate = useNavigate();
    const { selectedMovie } = useContext(MyMovieDetailsContext);
    const [durationHr, setDurationHr] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const duration = selectedMovie.duration_mins;

    // Function to convert minutes to hours and minutes
    function convertMinsToHrsMins(duration) {
        let h = Math.floor(duration / 60);
        let m = duration % 60;
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        const durationHr = `${h}h ${m}m`;
        setDurationHr(durationHr);
    }

    const handleTicket = () => {
        navigate(`/movies/${selectedMovie.film_id}/showtimes`);
    };

    useEffect(() => {
        convertMinsToHrsMins(duration);
    }, [duration]);

    return (
        <div>
            {selectedMovie && (
                <div className='container mt-5 mb-5'>
                    <div className='row'>
                        <div className='col-md-6 fixed'>
                            <img
                                src={selectedMovie.images.poster[1].xxlarge.film_image}
                                alt=""
                                className='rounded w-75 d-sm-flex justify-content-center align-items-center'
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                        <div className='col-md-6 '>
                            <div d-flex justify-content-center align-items-center flex-row>
                                <h2 className='text-title mt-5'>
                                    {selectedMovie.film_name}
                                    <span className='ms-3 p-2' style={{ color: 'white', fontSize: '12px', width: '25px', backgroundColor: 'black' }}>
                                        {selectedMovie.age_rating[0].rating}
                                    </span>
                                </h2>
                            </div>
                            <hr />
                            <h6 className='text' style={{ color: 'gray' }}>
                                {selectedMovie.genres[0].genre_name}
                                <span className='ms-2'>|</span>
                                <span className='ms-2'>{durationHr}</span>
                            </h6>
                            <h6 className='text mt-4'>{selectedMovie.synopsis_long}</h6>
                            <div className='mt-5 d-flex  gap-5'>
                                <button className='btn btn-dark' onClick={handleShow}>
                                    <i className="fa-solid fa-play"></i> Watch trailer
                                </button>
                            </div>

                            <div className='row mt-5'>
                                <h4>Casts</h4>
                                {selectedMovie.cast && (
                                    <div className='d-flex flex-wrap'>
                                        {selectedMovie.cast.map((cast) => (
                                            <div key={cast.cast_id} className='me-4 mb-4 d-flex justify-content-center align-items-center flex-column'>
                                                <img src={cast.cast_image} alt={cast.cast_name} width={60} className='rounded-circle' />
                                                <p className='text-center mt-2'>{cast.cast_name}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <button className='btn btn-dark m-lg-5 m-md-5 m-sm-5' onClick={handleTicket}>
                            <i className="fa-solid fa-ticket"></i> Book Tickets
                        </button>
                    </div>
                </div>
            )}
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true} centered size='xl'>
                <Modal.Body style={{ backgroundColor: 'black' }}>
                    <ReactPlayer
                        url={selectedMovie?.trailers?.high[0]?.film_trailer}
                        controls={true}
                        playing={true}
                        width='100%'
                        height='100%'
                        backgroundColor='black'
                    />
                    <div className="d-flex flex-row justify-content-between w-50">
                        <div>
                            <Button variant="dark" onClick={handleClose} className="mt-3">
                                <i class="fa-solid fa-power-off"></i>
                            </Button>
                        </div>
                        <div className='ms-5 mt-3 ms-sm-5'><h2 className='text-light text-center'>Kera-TV</h2></div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default MovieDetails;
