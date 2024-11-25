import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Replies from "./components/Replies";
import Feed from './components/Feed';
import Profile from './components/Profile';
import Modify from './components/Modify';
const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/dashboard' element={<Home />} />
                    <Route path='/:id/replies' element={<Replies />} />
                    <Route path="/feed" element={<Feed />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/modify" element={<Modify />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;