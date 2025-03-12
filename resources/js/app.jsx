import '../css/app.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Ingreso from './Pages/Ingreso';

const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/ingreso" element={<Ingreso />} />
        </Routes>
    </Router>
);
