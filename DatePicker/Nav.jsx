import React from 'react';
import { Arrow } from './Icons';

export default function Nav({ switchPanel, navToPre, navToNext, children }) {
    return (
        <div className="dp-nav">
            <button className="dp-nav__pre" onClick={navToPre}>
                <Arrow className={`dp-nav__arrow`} />
            </button>

            <button className="dp-nav__next" onClick={navToNext}>
                <Arrow className={`dp-nav__arrow --reverted`} />
            </button>
            
            <div className={`dp-nav__label ${switchPanel? '--switchable' : ''}`} onClick={switchPanel}>
                { children }
            </div>
        </div>
    )
}