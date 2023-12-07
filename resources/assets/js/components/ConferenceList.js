import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConferenceList = () => {
    const [conferences, setConferences] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/conferences')
            .then(response => {
                setConferences(response.data);
            })
            .catch(error => {
                console.error('Error fetching conferences:', error);
            });
    }, []);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12">
                    <h2 className="mb-4">Conference List</h2>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Date</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {conferences.map((conference, index) => (
                            <tr key={conference.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{conference.title}</td>
                                <td>{conference.description}</td>
                                <td>{new Date(conference.start_time).toLocaleDateString()} - {new Date(conference.end_time).toLocaleDateString()}</td>
                                <td>
                                    {/* Add action buttons here if needed */}
                                    <button className="btn btn-primary btn-sm">View</button>
                                    <button className="btn btn-secondary btn-sm">Edit</button>
                                    <button className="btn btn-danger btn-sm">Delete</button>
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
