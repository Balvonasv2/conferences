import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = ({ onRegister }) => {
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/register', userDetails);
            navigate('/login');
        } catch (error) {
            console.error('Registration error', error.response);
        }
    };

    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center">
            <div className="col-md-6">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card">
                                <h5 className="card-header">Register</h5>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit} className="d-grid gap-2">
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name:</label>
                                            <input type="text" id="name" name="name" className="form-control" value={userDetails.name} onChange={handleChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email:</label>
                                            <input type="email" id="email" name="email" className="form-control" value={userDetails.email} onChange={handleChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password:</label>
                                            <input type="password" id="password" name="password" className="form-control" value={userDetails.password} onChange={handleChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password_confirmation" className="form-label">Confirm Password:</label>
                                            <input type="password" id="password_confirmation" name="password_confirmation" className="form-control" value={userDetails.password_confirmation} onChange={handleChange} required />
                                        </div>
                                        <button type="submit" className="btn btn-primary w-100">Register</button>
                                        <div className="mt-3 text-center">
                                            Already have an account? <Link to="/login" className="link-primary">Login</Link>
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

export default Register;
