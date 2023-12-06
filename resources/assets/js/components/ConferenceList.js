import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConferenceList = () => {
    const [conferences, setConferences] = useState([]);

    useEffect(() => {
        const fetchConferences = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/conferences');
                setConferences(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchConferences();
    }, []);

    return (
        <div className="container">
            <h1>Conference List</h1>
            <ul>
                {conferences.map(conference => (
                    <li key={conference.id}>{conference.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default ConferenceList;
