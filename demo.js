import React from 'react';
import ReactDOM from 'react-dom';

import DatePicker from './DatePicker';

import './demo.css';

function Demo() {
    return (
        <div className="demo-container">
            <DatePicker onChange={date => console.log(date)} />
        </div>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <Demo />
    </React.StrictMode>,
    document.getElementById('demo')
);