import React, { useContext, useEffect, useState } from 'react';
import cinemas from '../Assets/cinemas logo.png';
import AuthWrapper from '../Components/AuthWrapper';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import { MyLocationContext, MyTheaterContext } from '../ContextShare/ContextShare';
import API from '../lib/api';

function Theatres() {
    const [theatres, setTheatres] = useState([]);
    const { selectedCity } = useContext(MyLocationContext);
    const { selectedTheater, setSelectedTheater } = useContext(MyTheaterContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get('theaters');
                
             
                setTheatres(response.data);
                setSelectedTheater(response.data);
            } catch (error) {
                console.error(error); // Handle any errors here
            }
        };

        fetchData();
    }, [selectedCity,selectedTheater,setSelectedTheater]);
    console.log(selectedTheater);

    console.log(theatres);

    return (

        <AuthWrapper>
            <div>
                <Header />
                <div className='mb-5 container theaters-container'>
                    <h3 className='text-title mt-5 container'>Theatres Nearby</h3>
                    {theatres[selectedCity] && (
                        <div className='d-flex flex-wrap'>
                            {theatres[selectedCity].map((theatre) => (
                                <div className='card p-5 d-flex justify-content-center align-items-center m-3 col-sm-6 flex-wrap' style={{ width: '200px' }}>
                                    <img src={cinemas} style={{ width: "3.5rem" }} alt="" />
                                    <p className='text-wrap text-center'>{theatre}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        </AuthWrapper>

    );
}

export default Theatres;
