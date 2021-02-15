import React, { useState, useEffect } from 'react';

import { chunk, isSameDay, addMonths, monthYearFmt,  dateOptions } from './utils';
import Nav from './Nav';

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Tu', 'Fr', 'Sa'];

export default function DateSelectPanel({ selected, today, toMonthSelectPanel, selectDate }) {
    const [showingMonth, navTo] = useState(selected);
    const [year, month] = [showingMonth.getFullYear(), showingMonth.getMonth()];
    const opts = chunk(dateOptions(year, month), 7).filter(
        row => {
            const [firstDate] = row[0];
            const [lastDate] = row[row.length - 1];
            return firstDate.getMonth() === month || lastDate.getMonth() === month;
        }
    );

    const navToPreMonth = () => navTo(addMonths(showingMonth, -1));
    const navToNextMonth = () => navTo(addMonths(showingMonth, 1));

    const optClasses = (date) => {
        return [
            'dp-date__opt',
            date.getMonth() !== month? '--out-of-range' : '',
            isSameDay(date, selected)? '--selected' : '',
            isSameDay(date, today)? '--today' : ''
        ].join(' ');
    }

    useEffect(() => {
        navTo(selected);
    }, [selected]);

    return (
        <div className="dp-panel">
            <div className="dp-date__header">
                <Nav switchPanel={toMonthSelectPanel}
                     navToPre={navToPreMonth}
                     navToNext={navToNextMonth}
                >{ monthYearFmt(showingMonth) }</Nav>
                <div className="dp-date__weekdays">
                    {
                        [...new Array(7)].map((_, wday) => (
                            <div key={`wday-${wday}`} 
                                 className="dp-date__weekday">{ weekDays[wday] }</div>
                        ))
                    }
                </div>
            </div>

            <div className="dp-date__selections">
                {
                    opts.map((week, wi) => (
                        <div key={`w-${wi}`} className="dp-date__week">
                            {
                                week.map(([date, dateText], di) =>  (
                                    <div key={`d-${wi}-${di}`} 
                                        className={optClasses(date)}
                                        onClick={() => selectDate(date)}
                                    >{ dateText }</div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
