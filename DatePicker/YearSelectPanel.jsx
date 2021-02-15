import React, { useState, useEffect } from 'react';

import { addYears, yearOptions } from './utils';
import Nav from './Nav';

export default function YearSelectPanel({ selected, selectDate }) {
    const [showingDecade, navTo] = useState(selected);
    const selectedYear = selected.getFullYear();
    const opts = yearOptions(showingDecade.getFullYear());

    const navToPreDecade  = () => navTo(addYears(showingDecade, -10));
    const navToNextDecade = () => navTo(addYears(showingDecade, 10));

    const selectYear = (year) => {
        const date = new Date(year, selected.getMonth(), selected.getDate());
        selectDate(date);
    }

    const optClasses = (year, index) => {
        return [
            'dp-year__opt',
            index === 0 || index === opts.length - 1? '--out-of-range' : '',
            year === selectedYear? '--selected' : ''
        ].join(' ');
    }

    useEffect(() => {
        navTo(selected);
    }, [selected]);

    return (
        <div className="dp-panel">
            <Nav navToPre={navToPreDecade}
                 navToNext={navToNextDecade}
            >{ `${opts[1]}-${opts[opts.length - 2]}` }</Nav>
            <div className="dp-year__selections">
                {
                    opts.map((year, i) => (
                        <div key={`y-${year}`} 
                             className={optClasses(year, i)}
                             onClick={() => selectYear(year)}
                        >{ year }</div>
                    ))
                }
            </div>
        </div>
    )
}