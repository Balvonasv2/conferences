import './bootstrap.js';
import React from 'react';
import ReactDOM from 'react-dom';
import ConferenceList from './components/ConferenceList';

const App = () => {
    return (
        <>
            <ConferenceList />
            <AddConferenceForm />
        </>
    );
};

if (document.getElementById('app')) {
    ReactDOM.render(<ConferenceList />, document.getElementById('app'));
}
