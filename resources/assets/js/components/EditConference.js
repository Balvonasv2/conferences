import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditConference = () => {
    const { conferenceId } = useParams();
    const [conference, setConference] = useState({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        location: '',
        attendee_limit: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/conferences/${conferenceId}`)
            .then(response => {
                console.log('ConferenceID: ', conferenceId);
                console.log('Fetched data: ', response.data);
                const data = response.data;

                const formattedStartTime = data.start_time ? new Date(data.start_time).toISOString().slice(0, 16) : '';
                const formattedEndTime = data.end_time ? new Date(data.end_time).toISOString().slice(0, 16) : '';

                setConference({
                    title: data.title || '',
                    description: data.description || '',
                    start_time: formattedStartTime,
                    end_time: formattedEndTime,
                    location: data.location || '',
                    attendee_limit: data.attendee_limit || ''
                });
            })
            .catch(error => {
                console.error('Error fetching conference details:', error);
            });
    }, [conferenceId]);


    const handleChange = (e) => {
        setConference({ ...conference, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem('authToken');

        axios.put(`http://localhost:8000/api/conferences/${conferenceId}`, conference, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            }
        })
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error('Error updating conference:', error);
            });
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="container">
            <h2>Edit Conference</h2>
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
                <button type="submit" className="btn btn-primary">Update Conference</button>
                <button type="button" className="btn btn-outline-danger" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default EditConference;
