import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Reusing the same CSS file
import loginImg from "../assets/loginn-img.png";
import axiosInstance from '../axiosConfig';
import Nav from "./Nav"

const Register = () => {
    const [username, setUsername] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [grade, setGrade] = useState('');
    const [matricule, setMatricule] = useState('');
    const [placeOfWork, setPlaceOfWork] = useState('');
    const navigate = useNavigate();

    const signUp = async () => {
        try {
            const response = await axiosInstance.post('/register', {
                email,
                password,
                username,
                lastname, 
                grade,
                matricule,
                placeOfWork,
            });
            
            const data = response.data;
            if (data.error_message) {
                alert(data.error_message);
            } else {
                alert('Account created successfully!');
                navigate('/'); 
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while creating your account.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signUp();
        setEmail('');
        setUsername('');
        setLastname('');
        setPassword('');
        setGrade('');
        setMatricule('');
        setPlaceOfWork('');
    };

    return (
        <>
        <Nav/>
        <main className='auth-container'>
            <div className='auth-box'>
                <h1 className='auth-title'>Create an account</h1>
                <form className='auth-form' onSubmit={handleSubmit}>
                    <label htmlFor='username'>Name</label>
                    <input
                        type='text'
                        name='username'
                        id='username'
                        required
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <label htmlFor='lastname'>Last Name</label> {/* New field for last name */}
                    <input
                        type='text'
                        name='lastname'
                        id='lastname'
                        required
                        value={lastname}
                        onChange={e => setLastname(e.target.value)}
                    />
                    <label htmlFor='email'>Email Address</label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <label htmlFor='grade'>Job Title</label> {/* New field for grade */}
                    <input
                        type='text'
                        name='grade'
                        id='grade'
                        required
                        value={grade}
                        onChange={e => setGrade(e.target.value)}
                    />
                    <label htmlFor='matricule'>Matricule</label> {/* New field for matricule */}
                    <input
                        type='text'
                        name='matricule'
                        id='matricule'
                        required
                        value={matricule}
                        onChange={e => setMatricule(e.target.value)}
                    />
                    <label htmlFor='placeOfWork'>Place of Work</label> {/* New field for place of work */}
                    <input
                        type='text'
                        name='placeOfWork'
                        id='placeOfWork'
                        required
                        value={placeOfWork}
                        onChange={e => setPlaceOfWork(e.target.value)}
                    />
                    
                    <button className='auth-btn'>REGISTER</button>
                </form>
            </div>
            <div className='login-image'>
                <img src={loginImg} alt="Login" />
            </div>
        </main>
        </>
    );
};

export default Register;
