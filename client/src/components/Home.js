import React, { useState } from "react";
import axiosInstance from '../axiosConfig';
import Nav from "./Nav";
import '../styles/Home.css';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()

    const [thread, setThread] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Get the JWT token from localStorage (or sessionStorage)
        const token = localStorage.getItem('token');
        console.log(token) // Replace with sessionStorage if you store it there
    
        if (!token) {
            console.error('No token found. You must be logged in to create a thread.');
            return;
        }
    
        try {
            // POST request to backend to create a new thread
            const response = await axiosInstance.post('/threads', {
                title: thread,
                description: description,
            }, {
                headers: {
                    Authorization: `Bearer ${token}` // Attach the token in the Authorization header
                }
            });
    
            // Log the response from the server
            console.log('Thread created:', response.data);
            navigate('/feed')
    
            // Reset form fields after submission
            setThread("");
            setDescription("");
    
        } catch (error) {
            console.error('Error creating thread:', error);
        }
    };
    

    return (
        <>
            <Nav />
            <main className='home'>
                <h2 className='homeTitle'>Create a Thread</h2>
                <form className='homeForm' onSubmit={handleSubmit}>
                    <div className='home__container'>
                        <label htmlFor='thread'>Title</label>
                        <input
                            type='text'
                            name='thread'
                            required
                            value={thread}
                            onChange={(e) => setThread(e.target.value)}
                        />
                    </div>

                    <div className='home__container'>
                        <label htmlFor='description'>Description</label>
                        <textarea
                            name='description'
                            rows="4"  // Set the number of rows for the textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <button className='homeBtn'>CREATE THREAD</button>
                </form>
            </main>
        </>
    );
};

export default Home;
