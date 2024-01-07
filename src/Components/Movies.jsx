import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {  MyLocationContext, MyMovieDetailsContext } from '../ContextShare/ContextShare';
import { Link } from 'react-router-dom';


function Movies() {
    const [movies, setMovies] = useState([]);
    const {selectedCity} = useContext(MyLocationContext)
    const {selectedMovie,setSelectedMovie} = useContext(MyMovieDetailsContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/filimDetails');
                setMovies(response.data);
            } catch (error) {
                console.error(error); // Handle any errors here
            }
        };

        fetchData();
    }, []);

    const handleMovieCard = (movie) => {
        console.log(movie);
        setSelectedMovie(movie);
    }
    console.log(movies);
    console.log(selectedCity);

    return (
        <>
            <h3 className='text-title mt-5 container'>Movies Nearby</h3>
            <div className='movies flex-wrap gap-3 container mt-3' style={{ display: 'flex', flexDirection: 'row' }}>
                {movies.map((movie, index) => (
                    <Link 
                    to={{
                      pathname: `/movies/${movie.film_id}`,
                      state: { movie: movie }
                    }} 
                    key={`${movie.film_id}-${index}`} 
                    style={{textDecoration:"none", color:"black"}}

                    onClick={() => handleMovieCard(movie)}
                  >
                        <div className='shadow rounded d-flex flex-column justify-content-center align-items-center' style={{ width: 170 ,height:280}}>
                            {movie.images.poster[1]?.xxlarge?.film_image && (
                                <img src={movie.images.poster[1].xxlarge.film_image} alt={movie.film_name} className='rounded mt-2'  width={120} style={{height:200}} />
                            )}
                            <h6 className='film-title px-1 text-center m-2 '>{movie.film_name}</h6>
                        </div>
                    </Link>
                ))}
            </div>
            <center><div className='rounded bg-dark mt-5 mb-5' style={{height:"100px",width:"75%"}}>
            <i class="fa-solid fa-ticket fa-2x mt-2" style={{color:'gold'}}></i>
                <h2 className='text-white '>Endless Entertainment Anytime. Anywhere!</h2>
                
            </div></center>
        </>
    );
}

export default Movies;
