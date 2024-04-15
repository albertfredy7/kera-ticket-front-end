import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {auth, db} from '../config'
import {createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import { doc, setDoc } from "firebase/firestore"; 
import Header from './Header';
import Footer from './Footer';

function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null); // Step 1: Add an error state
    const navigate = useNavigate()

    const onSubmit = async (e) => {
      e.preventDefault();
      
      try {
        await createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            const user = userCredential.user;
            setUser(user);
            console.log(user);

            await updateProfile(user, {
              displayName: displayName,
            }).then(() => {
              console.log('Display name updated');
            }).catch((error) => {
              console.error('Error updating display name: ', error);
              setError(error.message); // Update the error state with the error message
            });

            await setDoc(doc(db, "users", user.uid), {
              displayName: displayName,
              uid: user.uid,
              email: email,
            }).then(() => {
              navigate('/');
            }).catch((error) => {
              console.error("Error setting document: ", error);
              setError(error.message); // Update the error state with the error message
            });
          })
      } catch (error) {
        console.log(error.code, error.message);
        setError(error.message); // Update the error state with the error message
      }
    };

    return (
        <div className='d-flex justify-content-between flex-column' style={{height:'100vh'}}>
          <Header/>
          <div className='container d-flex justify-content-center align-items-center '>
              <form className='form-control p-5 d-flex flex-column gap-3 w-75'>
                 <h3> Register </h3>
                  
                 {error && <div className="alert alert-danger" role="alert">{error}</div>} {/* Step 3: Display the error message */}
                  
                 <input type="text" className='form-control' placeholder='enter the username' id="username" name="username" onChange={(e)=>{setDisplayName(e.target.value)}} />
    
                 <input type="email" className='form-control' placeholder='enter the email' id="email" name="email" onChange={(e)=>{setEmail(e.target.value)}} />
    
                 <input type="password" className="form-control" id="password" placeholder='Enter the password' name="password" onChange={(e)=>{setPassword(e.target.value)}} />
    
                 <p>Already have an account <span><Link to={'/login'} style={{textDecoration:"none",color:"gray"}}>Login</Link></span></p>
    
                 <button className='btn btn-dark ' onClick={onSubmit} >Register</button>
              </form>
          </div>
          <div><Footer/></div>
        </div>
      
    )
}

export default Register