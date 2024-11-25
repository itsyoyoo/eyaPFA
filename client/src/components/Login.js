import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/loginn-img.png";
import '../styles/Login.css';
import axiosInstance from '../axiosConfig'; // Use axiosInstance for requests
import Nav from "./Nav";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send login request to the backend
            const response = await axiosInstance.post('/login', {
                email,
                password,
            });

            // Save the token in localStorage if the login is successful
            localStorage.setItem('token', response.data.token);

            // Optionally, save user ID in localStorage if needed
            localStorage.setItem("_id", response.data.id); 

            // Navigate to the dashboard/homepage or another protected route after successful login
            navigate("/feed");
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <>
        <Nav />
        <main className='auth-container'>
            <div className='auth-box'>
                <h1 className='auth-title'>Log into your account</h1>
                <form className='auth-form' onSubmit={handleSubmit}>
                    <label htmlFor='email'>Email Address</label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='auth-btn'>LOG IN</button>
                    <p>
                        Don't have an account? <Link to='/register'>Create one</Link>
                    </p>
                </form>
            </div>
            <div className='login-image'>
                <img src={loginImg} alt="Login" />
            </div>
        </main>
        </>
    );
};

export default Login;
