// src/Components/AuthWrapper.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../ContextShare/AuthContext';
import { Navigate, Redirect } from 'react-router-dom';

const AuthWrapper = ({ children }) => {
 const { currentUser } = useContext(AuthContext);

 if (!currentUser) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
 }

 // If the user is logged in, render the children components
 return children;
};

export default AuthWrapper;