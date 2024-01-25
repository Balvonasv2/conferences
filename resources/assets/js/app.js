import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ConferenceList from './components/ConferenceList';
import Login from './components/Login';
import Register from './components/Register';
import CreateConference from './components/CreateConference';
import EditConference from "./components/EditConference";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const App = () => {
    const [conferences, setConferences] = useState([]);
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleConferenceCreated = (newConference) => {
        setConferences([...conferences, newConference]);
    };

    const handleLogin = (userData, token) => {
        localStorage.setItem('authToken', token);
        setIsLoggedIn(true);
        setUser(userData);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
    };

    return (
        <BrowserRouter>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="d-flex justify-content-end">
                        {!isLoggedIn ? (
                            <Link to="/login" className="btn btn-outline-success">Log in</Link>
                        ) : (
                            <button onClick={handleLogout} className="btn btn-outline-danger">Log out</button>
                        )}
                    </div>
                </div>
            </nav>
            <Routes>
                <Route path="/" element={<ConferenceList isLoggedIn={isLoggedIn} />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register/>} />
                <Route path="/create" element={<CreateConference/>} />
                <Route path="/edit/:conferenceId" element={<EditConference/>} />
            </Routes>
        </BrowserRouter>
    );
};

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
