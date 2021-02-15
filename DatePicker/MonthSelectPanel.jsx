import React, { useState, useEffect } from 'react';

import { addYears, yearFmt, monthOptions } from './utils';
import Nav from './Nav';

export default function MonthSelectPanel({ selected, selectDate, toYearSelectPanel }) {
    const selectedMonth = selected.getMonth();
    const [showingYear, navTo] = useState(selected);
    const opts = monthOptions();

    const navToPreYear  = () => navTo(addYears(showingYear, -1));
    const navToNextYear = () => navTo(addYears(showingYear, 1));

    const selectMonth = (month) => {
        const date = new Date(showingYear.getFullYear(), month, selected.getDate());
        selectDate(date);
    }

    const optClasses = month => {
        return [
            'dp-month__opt',
            month === selectedMonth? '--selected' : ''
        ].join(' ');
    }

    useEffect(() => {
        navTo(selected);
    }, [selected]);

    return (
        <div className="dp-panel">
            <Nav switchPanel={toYearSelectPanel}
                 navToPre={navToPreYear}
                 navToNext={navToNextYear}
            >{ yearFmt(showingYear) }</Nav>
            <div className="dp-month__selections">
                {
                    opts.map(([month, monthText]) => (
                        <div key={`m-${month}`} 
                             className={optClasses(month)}
                             onClick={() => selectMonth(month)}
                        >{ monthText }</div>
                    ))
                }
            </div>
        </div>
    )
}
