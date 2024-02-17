import React, { useContext, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { MyLocationContext } from '../ContextShare/ContextShare';
import { AuthContext } from '../ContextShare/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../config';
import { Link } from 'react-router-dom';


function Header() {
    const [show, setShow] = useState(false);
    const {selectedCity,setSelectedCity} = useContext(MyLocationContext)
    const { currentUser } = useContext(AuthContext)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCardClick = (city) => {
        setSelectedCity(city);
        localStorage.setItem('selectedCity',city);
        handleClose(); // Close the modal after selecting a card
    };
    // console.log(selectedCity);

    const city=localStorage.getItem('selectedCity') && setSelectedCity(localStorage.getItem('selectedCity'))
    // console.log(city);

    



    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">Kera-Tickets</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/movies">Movies</Nav.Link>
                        <Nav.Link href="/theatres">Theatres</Nav.Link>
                        <Nav.Link href="/orders">Orders</Nav.Link>
                    </Nav>
                    <Nav className='d-flex justify-content-center align-items-center'>
                        <Nav.Link  onClick={handleShow}><i class="fa-solid fa-map-pin"></i> {selectedCity }</Nav.Link>
                        <Nav.Link eventKey={2}>
                            {currentUser?.email ? <button onClick={()=>signOut(auth)} className='btn btn-dark'>Logout</button> : <Link to={'/login'}><button className='btn btn-dark'>Login</button></Link>}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Select your district</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex flex-wrap gap-2 justify-content-center p-5 '>
                        <div className='p-5 card' style={{ width: "50", fontSize: "12px" }} onClick={() => handleCardClick('Thiruvananthapuram')}>
                            Thiruvananthapuram
                        </div>
                        <div className='p-5 card' style={{ width: "50", fontSize: "12px" }} onClick={() => handleCardClick('Kollam')}>
                            Kollam
                        </div>
                        <div className='p-5 card' style={{ width: "50", fontSize: "12px" }} onClick={() => handleCardClick('Pathanamthitta')}>
                            Pathanamthitta
                        </div>
                        <div className='p-5 card' style={{ width: "50", fontSize: "12px" }} onClick={() => handleCardClick('Alappuzha')}>
                            Alappuzha
                        </div>
                        <div className='p-5 card' style={{ width: "50", fontSize: "12px" }} onClick={() => handleCardClick('Kottayam')}>
                            Kottayam
                        </div>
                        <div className='p-5 card' style={{ width: "50", fontSize: "12px" }} onClick={() => handleCardClick('Idukki')}>
                            Idukki
                        </div>
                        <div className='p-5 card' style={{ width: "50", fontSize: "12px" }} onClick={() => handleCardClick('Ernakulam')}>
                            Ernakulam
                        </div>
                        <div className='p-5 card' style={{ width: "50", fontSize: "12px" }} onClick={() => handleCardClick('Thrissur')}>
                            Thrissur
                        </div>
                        <div className='p-5 card' style={{ width: "50", fontSize: "12px" }} onClick={() => handleCardClick('Palakkad')}>
                            Palakkad
                        </div>
                        <div className='p-5 card' style={{ width: "50", fontSize: "12px" }} onClick={() => handleCardClick('Malappuram')}>
                            Malappuram
                        </div>
                        <div className='p-5 card' style={{ width: "50", fontSize: "12px" }} onClick={() => handleCardClick('Kozhikode')}>
                            Kozhikode
                        </div>
                        <div className='p-5 card' style={{ width: "50", fontSize: "12px" }} onClick={() => handleCardClick('Wayanad')}>
                            Wayanad
                        </div>
                        <div className='p-5 card' style={{ width: "50", fontSize: "12px" }} onClick={() => handleCardClick('Kannur')}>
                            Kannur
                        </div>
                        <div className='p-5 card' style={{ width: "50", fontSize: "12px" }} onClick={() => handleCardClick('Kasaragod')}>
                            Kasaragod
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </Navbar>

    )
}

export default Header