import React from 'react';

export function Calendar({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" className={className}>
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V10h16v11zm0-13H4V5h16v3z"/>
        </svg>
    )
}

export function Arrow({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 72.000000 72.000000"
             preserveAspectRatio="xMidYMid meet"
             className={className}
        >
            <g transform="translate(0.000000,72.000000) scale(0.100000,-0.100000)"
            fill="#000000" stroke="none">
                <path d="M140 505 l-145 -145 145 -145 c80 -80 149 -145 154 -145 5 0 20 10
                33 22 l24 22 -123 123 -123 123 123 123 123 123 -24 22 c-13 12 -28 22 -33 22
                -5 0 -74 -65 -154 -145z"/>
            </g>
        </svg>
    )
}