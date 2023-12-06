import React, { useState } from 'react';
import axios from 'axios';

const AddConference = () => {
    const [conference, setConference] = useState({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        location: '',
        attendee_limit: '',
    });

    const handleChange = (e) => {
        setConference({
            ...conference,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/conferences', conference)
            .then(response => {
                console.log(response.data);
                // Handle success, such as showing a message or redirecting
            })
            .catch(error => {
                console.error('There was an error creating the conference', error);
                // Handle errors, such as form validation feedback
            });
    };

    return (
        <div className="container mt-5">
            <h2>Add Conference</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={conference.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={conference.description}
                        onChange={handleChange}
                    />
                </div>
                {/* Add more fields for start_time, end_time, location, etc. */}
                <button type="submit" className="btn btn-primary">Add Conference</button>
            </form>
        </div>
    );
};

export default AddConference;
