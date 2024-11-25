import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Modify.css';
import Nav from "./Nav";

const Modify = () => {
  const [user, setUser] = useState({
    email: '',
    username: '',
    lastname: '',
    matricule: '',
    grade: '',
    placeOfWork: '',
  });
  const navigate = useNavigate();

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
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/profile', user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Profile updated successfully!');
      navigate('/profile');
    } catch (error) {
      console.error(error);
      alert('An error occurred while updating the profile.');
    }
  };

  return (
    <>
      <Nav />
      <div className="modify-container">
        <h1>Modify Your Profile</h1>
        <form className="modify-form" onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            First Name:
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastname"
              value={user.lastname}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Matricule:
            <input
              type="text"
              name="matricule"
              value={user.matricule}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Job Title:
            <input
              type="text"
              name="grade"
              value={user.grade}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Place of Work:
            <input
              type="text"
              name="placeOfWork"
              value={user.placeOfWork}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Save Changes</button>
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="cancel-button"
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default Modify;
