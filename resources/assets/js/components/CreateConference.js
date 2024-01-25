import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateConference = ({ onConferenceCreated }) => {
    const [conference, setConference] = useState({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        location: '',
        attendee_limit: ''
    });

    const getCsrfToken = () => {
        const metaTag = document.querySelector('meta[name="csrf-token"]');
        return metaTag ? metaTag.getAttribute('content') : '';
    };

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/');
    }

    const handleChange = (e) => {
        setConference({ ...conference, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem('authToken');

        axios.post('http://localhost:8000/api/conferences', conference, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            }
        })
        .then(response => {
            console.log('Response: ', response);
            navigate('/');
        })
        .catch(error => {
            console.error('Error message: ', error.message);
            console.error('Full error: ', error);
        });
    }


    return (
        <div className="container mt-3">
            <h2>Create a New Conference</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={conference.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={conference.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="start_time" className="form-label">Start time</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="start_time"
                        name="start_time"
                        value={conference.start_time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="end_time" className="form-label">End time</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="end_time"
                        name="end_time"
                        value={conference.end_time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        value={conference.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="attendee_limit" className="form-label">Attendee limit</label>
                    <input
                        type="text"
                        className="form-control"
                        id="attendee_limit"
                        name="attendee_limit"
                        value={conference.attendee_limit}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">Create Conference</button>
                <button type="button" className="btn btn-outline-danger" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default CreateConference;
