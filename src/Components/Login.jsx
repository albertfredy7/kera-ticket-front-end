import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Header from './Header';
import Footer from './Footer';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // New state for error handling
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const onLogin = (e) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            setError('Email and password are required.');
            setShowError(true);
            return;
        }

        // You can add more complex validation here if needed

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate("/");
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage); // Set the error message
                setShowError(true);
                console.log(errorCode, errorMessage);

                setTimeout(() => {
                    setError(''); // Clear the error message
                    setShowError(false); // Hide the error message
                }, 2000); // 2000 milliseconds = 2 seconds
            });
    };

    return (
        <div className='d-flex justify-content-between flex-column' style={{ height: '100vh' }}>
            <Header />
            <div className='container d-flex justify-content-center align-items-center'>
                <form className='form-control p-5 d-flex flex-column gap-3 w-75'>
                    <h3>Login</h3>
                    {error && <div className="alert alert-danger" role="alert">{error}</div>} {/* Display error message */}
                    <input type="email" className='form-control' placeholder='enter the email' id="email" name="email" onChange={(e) => { setEmail(e.target.value) }} />
                    <input type="password" className="form-control" id="password" placeholder='Enter the password' name="password" onChange={(e) => { setPassword(e.target.value) }} />
                    <p>New User? <span><Link to={'/register'} style={{ textDecoration: "none", color: "gray" }}>Create account</Link></span></p>
                    <button onClick={onLogin} className='btn btn-dark'>Login</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Login;
