import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ConferenceList from './components/ConferenceList';
import AddConferenceModal from './components/AddConferenceModal.js'; // Make sure this is correctly imported
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const App = () => {
    const [conferences, setConferences] = useState([]);

    const handleConferenceCreated = (newConference) => {
        setConferences([...conferences, newConference]);
    };

    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createConferenceModal">
                Create Conference
            </button>
            <AddConferenceModal onConferenceCreated={handleConferenceCreated} />
            <ConferenceList conferences={conferences} />
        </>
    );
};

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
