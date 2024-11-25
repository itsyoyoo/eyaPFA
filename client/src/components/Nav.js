import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import '../styles/Nav.css';

const Nav = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('_id');

    const handleLogout = () => {
        localStorage.removeItem('_id');
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="nav-left">
                <span className="nav-logo">
                    le Couloir
                </span>
                <div className="nav-underline"></div>
            </div>
            <div className="nav-right">
                {token && (
                    <>
                        <NavLink 
                            to="/feed" 
                            className={({ isActive }) => isActive ? 'active-link' : ''}
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to="/dashboard" 
                            className={({ isActive }) => isActive ? 'active-link' : ''}
                        >
                            Create
                        </NavLink>
                        <NavLink 
                            to="/profile" 
                            className={({ isActive }) => isActive ? 'active-link' : ''}
                        >
                            Profile
                        </NavLink>
                        <button className="nav-logout" onClick={handleLogout}>
                            Log Out
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav;
