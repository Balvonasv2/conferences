import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ConferenceList = ({ isLoggedIn }) => {
    const [conferences, setConferences] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/conferences')
            .then(response => {
                setConferences(response.data);
            })
            .catch(error => {
                console.error('Error fetching conferences:', error);
            });
    }, []);

    const handleAddConference = () => {
        navigate('/create');
    };

    const handleEdit = (conferenceId) => {
        navigate(`/edit/${conferenceId}`);
    };

    const handleDelete = (conferenceId) => {
        if (window.confirm('Are you sure you want to delete this conference?')) {
            const authToken = localStorage.getItem('authToken');
            axios.delete(`http://localhost:8000/api/conferences/${conferenceId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                }
            })
            .then(() => {
                console.log('Conference successfully deleted');
                navigate('/');
                setConferences(conferences.filter(conference => conference.id !== conferenceId));
            })
            .catch(error => {
                console.error('Error deleting conference:', error);
            });
        }
    };

    return (
        <div className="container mt-5">
            {isLoggedIn && (
                <div>
                    <button className="btn btn-primary" onClick={handleAddConference}>Add Conference</button>
                </div>
            )}
            <div className="row">
                <div className="col-12">
                    <h2 className="mb-4">Conferences</h2>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Date</th>
                            <th scope="col">Attendee limit</th>
                            {isLoggedIn && (
                            <th scope="col">Actions</th>
                            )}
                        </tr>
                        </thead>
                        <tbody>
                        {conferences.map((conference, index) => (
                            <tr key={conference.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{conference.title}</td>
                                <td>{conference.description}</td>
                                <td>{new Date(conference.start_time).toLocaleDateString()} - {new Date(conference.end_time).toLocaleDateString()}</td>
                                <td>{conference.attendee_limit}</td>
                                <td>
                                    {isLoggedIn && (
                                        <>
                                            <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(conference.id)}>Edit</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(conference.id)}>Delete</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {conferences.length === 0 && <p>No conferences available.</p>}
                </div>
            </div>
        </div>
    );
};

export default ConferenceList;
