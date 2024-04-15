// src/Pages/Home.jsx
import React from 'react';
import AuthWrapper from '../Components/AuthWrapper'; // Import AuthWrapper
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

function Home() {
 const navigate = useNavigate();
 const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 768px)' });

 return (
    <AuthWrapper>
      <div className='overflow-hidden'>
        <Header />
        <div className='row bg-black'>
          <div className='col-lg-3 col-md-6 col-sm-12 d-none d-sm-block'><img src="https://i.gifer.com/7S33.gif" className=' mt-5' alt="" style={{ transform: 'scaleX(-1)' }} /></div>
          <div className="col-lg-6 col-md-6 col-sm-12 bg-black text-white d-flex flex-column justify-content-center align-items-center h-100" style={{ height: "100vh", padding: '15%' }}>
            <h1 style={{ whiteSpace: isDesktopOrLaptop ? 'nowrap' : 'normal' }}>Unleash Movie Magic with Kera Tickets</h1>
            <p className='fs-5'>Discover. Select. Book. Experience.</p>
            <Link to={'/movies'}><button className='btn btn-light px-5 mt-2'>Book now</button></Link>
          </div>
          <div className='col-lg-3 col-md-6 col-sm-12 d-none d-sm-block'><img src="https://i.gifer.com/7S33.gif" className='w-sm-25 mt-5' alt="" /></div>
        </div>
        <div className='bg-white p-5' >
          <div className='d-flex align-items-center justify-content-center'>
            <div className='d-flex align-items-center flex-row'>
              <div className='d-flex flex-column gap-0 justify-content-center ps-5'>
                <p className='lead fs-5'>Convenient</p>
                <h1 className='fs-1'>Easy and Affordable <br /> Movie Ticket Booking</h1>
                <p className='fs-5 lead'>Oru Kerala Ulppannam</p>
                <div>
                 <button className='btn fw-semibold mt-2 '>Learn more</button>
                 <Link to={'/movies'}><button className='btn btn-outline-dark fw-semibold mt-2 '>Book Now</button></Link>
                </div>
              </div>
              <div className=''>
                <img src="https://media.istockphoto.com/id/1642381175/vector/cinema.jpg?s=612x612&w=0&k=20&c=owIct55daWlWRwPbTYLI9Y1IsrgYiqJcpvvgycvxBhE=" className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className='bg-black' style={{margin:0}}>
          <section className="features-icons text-center bg-black text-white w-100 p-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12 gap-5">
                 <div className="mx-auto mb-5 mb-lg-0 mb-lg-3 d-flex align-items-center flex-column px-5">
                    <div className="d-flex align-items-center p-5">
                      <i className="bi bi-film" style={{ fontSize: '80px' }}></i>
                    </div>
                    <h4>Browse Movies and Showtimes</h4>
                    <p className="lead">Explore a wide selection of movies and showtimes.</p>
                 </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                 <div className="mx-auto mb-5 mb-lg-0 mb-lg-3 d-flex align-items-center flex-column px-5">
                    <div className="features-icons-icon d-flex p-5">
                      <i className="bi bi-camera-reels" style={{ fontSize: '80px' }}></i>
                    </div>
                    <h4>Explore diverse films and showtimes</h4>
                    <p className="lead">Book your tickets securely and receive them instantly.</p>
                 </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                 <div className="mx-auto mb-0 mb-lg-3 d-flex align-items-center flex-column px-5">
                    <div className="features-icons-icon d-flex p-5"><i className="bi bi-ticket-detailed" style={{ fontSize: '80px' }}></i></div>
                    <h4>Convenient Payment Options</h4>
                    <p className="lead">Choose from a variety of convenient payment options.</p>
                 </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <section className='bg-white p-5'>
          <div>
            <h1 className='text-center' style={{ fontSize: '70px' }}>Still Bored?</h1>
            <h2 className='text-center lead fs-2'>#oru padam kand vaanne</h2>
            <div className='d-flex align-items-center justify-content-center'>
              <button className='btn btn-dark text-center mt-3' onClick={() => { navigate('/movies') }}>Book Now</button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </AuthWrapper>
 );
}

export default Home;