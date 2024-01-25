import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login', credentials);
            onLogin(response.data.user, response.data.token);
            console.log('User successfully logged in', response.data);
            navigate('/');
        } catch (error) {
            console.error('Login error', error.response);
        }
    };

    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center">
            <div className="col-md-6">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card">
                                <h5 className="card-header">Login</h5>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email:</label>
                                            <input type="email" id="email" name="email" className="form-control" value={credentials.email} onChange={handleChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password:</label>
                                            <input type="password" id="password" name="password" className="form-control" value={credentials.password} onChange={handleChange} required />
                                        </div>
                                        <button type="submit" className="btn btn-primary w-100">Login</button>
                                        <div className="mt-3 text-center">
                                            Need an account? <Link to="/register" className="link-primary">Register</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
