import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from '../config';
import QRCode from 'qrcode.react'; // Import QRCode library
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import AuthWrapper from '../Components/AuthWrapper';

function Orders() {
    const [orders, setOrders] = useState([]); // State variable to hold the orders
    const [isLoading, setIsLoading] = useState(false);

    const getOrders = () => {
        setIsLoading(true); // Set loading state to true when starting to fetch orders
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log(user);
                const ordersCollectionRef = collection(db, "users", user.uid, "orders");
                const querySnapshot = getDocs(ordersCollectionRef);
                querySnapshot.then((querySnapshot) => {
                    const fetchedOrders = [];
                    querySnapshot.forEach((doc) => {
                        fetchedOrders.push(doc.data());
                    });
                    setOrders(fetchedOrders);
                    setIsLoading(false); // Set loading state to false when orders have been fetched
                }).catch((error) => {
                    console.error("Error getting documents: ", error);
                    setIsLoading(false); // Also set loading state to false in case of an error
                });
            } else {
                console.log("No user is signed in.");
                setIsLoading(false); // Set loading state to false if no user is signed in
            }
        });

        // Return the unsubscribe function to clean up the listener
        return unsubscribe;
    };

    useEffect(() => {
        getOrders();
    }, []); // Empty dependency array ensures this effect runs once on mount
    console.log(orders);

    return (
        <AuthWrapper>
            <div className='d-flex justify-content-between flex-column  ' >
                <Header />
                <div className='m-5  h-100 ' style={{ height: '100vh' }}>
                    <div className='container top-0'>
                        <h3>Bookings</h3>
                        {isLoading ? (
                            <div className='loader-container m-5'>
                                <ReactLoading type="bars" color="red" height={'10%'} width={'10%'} className='d-flex justify-content-center align-items-center container' />
                            </div>
                        ) : (
                            <div className='mt-5'>
                                {orders.length > 0 ? (
                                    orders.map((order, index) => {
                                        const date = new Date(order.selectedDate);
                                        // Format the date as "day month name year"
                                        const formattedDate = date.toLocaleDateString('en-US', {
                                            day: 'numeric',
                                            month: 'short',
                                        });

                                        return (
                                            <div className=' border-bottom pb-5  mt-5 mb-5 d-flex justify-content-center align-items-center' key={order.id || index}>
                                                <div className='row my-2 d-flex justify-content-center align-items-center'>
                                                    <div className='col-md-4 col-sm-12 d-flex justify-content-center '>
                                                        <img className='w-50 rounded-4' style={{ height: "14rem" }} src={order?.selectedMovie?.images?.poster['1']?.xxlarge?.film_image} alt={order.selectedMovie.film_name} />
                                                    </div>
                                                    <div className='col-md-4 col-sm-12'>
                                                        <h4 className='mt-5'>{order.selectedMovie.film_name}</h4>
                                                        <h5 style={{ color: "grey" }}>{order.theaterName} </h5>
                                                        <h5 style={{ color: "grey" }}><span>{formattedDate} | {order.showtime}</span> </h5>
                                                        <h4 style={{ color: "grey" }}>Seat : {order.selectedSeat.join(" | ")}</h4>
                                                        {/* Additional content here */}
                                                    </div>
                                                    <div className='col-md-4 col-sm-12 d-flex justify-content-center align-items-center d-none d-sm-block'>
                                                        {/* Generate QR Code for each order */}
                                                        <QRCode value={JSON.stringify({
                                                            movieName: order.movieName,
                                                            theaterName: order.theaterName,
                                                            selectedDate: formattedDate,
                                                            showtime: order.showtime,
                                                            selectedSeat: order.selectedSeat,
                                                        })} />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className='mt-5 d-flex flex-column justify-content-center align-items-center h-100'>
                                        <img src="https://i.pinimg.com/originals/50/8c/aa/508caa118b2ba91106ab4c0973617f3d.gif" className='image-fluid w-lg-25 w-75' alt="" />
                                        <h4>No orders found.</h4>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </AuthWrapper>
    );
}

export default Orders;
