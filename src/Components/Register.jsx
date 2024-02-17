import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {auth, db} from '../config'
import {createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import { doc, setDoc } from "firebase/firestore"; 

function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [user, setUser] = useState({})
    console.log(email, password);
    const navigate = useNavigate()



   


    const onSubmit = async (e) => {
      e.preventDefault();
      
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          setUser(user);
          console.log(user);

          // Update the user's display name
          await updateProfile(user, {
            displayName: displayName,
          }).then(() => {
            console.log('Display name updated');
          }).catch((error) => {
            console.error('Error updating display name: ', error);
          });

          // Set the document with the user's data
          await setDoc(doc(db, "users", user.uid), {
            displayName: displayName,
            uid: user.uid,
            email: email,
           
          }).then(() => {
            navigate('/');
          }).catch((error) => {
            console.error("Error setting document: ", error);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // ..
        });
  };


    return (
        <div>
            <form className='form-control p-5 d-flex flex-column gap-3'>
                <h3> Register </h3>
                
                <input type="text" className='form-control' placeholder='enter the username' id="username" name="username" onChange={(e)=>{setDisplayName(e.target.value)}}  />

                <input type="email" className='form-control' placeholder='enter the email' id="email" name="email" onChange={(e)=>{setEmail(e.target.value)}}  />

                <input type="password"  className="form-control" id="password" placeholder='Enter the password' name="password" onChange={(e)=>{setPassword(e.target.value)}} />

                <p>Already have an account <span><Link to={'/login'} style={{textDecoration:"none",color:"gray"}}>Login</Link></span></p>

                <button className='btn btn-dark '  onClick={onSubmit} >Register</button>
            </form>
        </div>
    )
}

export default Register