// Profile.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Profile.css';
import Nav from "./Nav";

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

  // Fetch user data
    useEffect(() => {
    const fetchUserData = async () => {
        try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/profile', {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        setUser(response.data);
        } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Failed to fetch profile information. Please try again.');
        }
    }; 

    fetchUserData();
    }, []);

  // Handle profile deletion
    const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
        try {
        const token = localStorage.getItem('token');
        await axios.delete('http://localhost:5000/api/profile', {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        alert('Profile deleted successfully.');
        localStorage.removeItem('token');
        navigate('/register');
        } catch (error) {
        console.error('Error deleting profile:', error);
        alert('An error occurred while deleting the profile. Please try again.');
        }
    }
    };

  // Show loading state
    if (!user) {
    return <p>Loading...</p>;
    }

  // Render user profile
    return (
    <>
        <Nav />
        <div className="profile-container">
        <h1>Profile Information</h1>
        <div className="profile-info">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>First Name:</strong> {user.username}</p>
            <p><strong>Last Name:</strong> {user.lastname}</p>
            <p><strong>Matricule:</strong> {user.matricule}</p>
            <p><strong>Job Title:</strong> {user.grade}</p>
            <p><strong>Place of Work:</strong> {user.placeOfWork}</p>
        </div>
        <button onClick={() => navigate('/modify')}>Modify</button>
        <button onClick={handleDelete} style={{ color: 'red' }}>Delete Profile</button>
        </div>
    </>
    );
};

export default Profile;
