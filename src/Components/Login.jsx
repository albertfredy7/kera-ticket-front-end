import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {auth} from '../config'
import {  signInWithEmailAndPassword   } from 'firebase/auth';


function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    console.log(email, password);

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    }

   
  return (
    <div>
        <form className='form-control p-5 d-flex flex-column gap-3'>
                <h3> Login </h3>
                
                <input type="email" className='form-control' placeholder='enter the email' id="email" name="email" onChange={(e)=>{setEmail(e.target.value)}}  />

                <input type="password"  className="form-control" id="password" placeholder='Enter the password' name="password" onChange={(e)=>{setPassword(e.target.value)}} />

                <p>New User? <span><Link to={'/register'} style={{textDecoration:"none",color:"gray"}}>Create account</Link></span></p>

                <button  onClick={onLogin}    className='btn btn-dark '>Login</button>
            </form>
    </div>
  )
}

export default Login