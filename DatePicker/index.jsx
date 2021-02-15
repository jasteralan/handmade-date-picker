import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import './styles.scss';

import { isoFmt, isValidDate } from './utils';
import { Calendar } from './Icons';
import YearSelectPanel from './YearSelectPanel';
import MonthSelectPanel from './MonthSelectPanel';
import DateSelectPanel from './DateSelectPanel';

function SelectPanel({
    rootRef, mode, selected, today, 
    toMonthSelectPanel, toYearSelectPanel,
    selectThenSwitchFn
}) {
    if(mode === 'hide') {
        return null;
    }

    return createPortal(
        <div className="dp-panel-wrapper">
            {
                mode === 'date-select'?
                <DateSelectPanel  selected={selected} today={today} 
                                toMonthSelectPanel={toMonthSelectPanel} 
                                selectDate={selectThenSwitchFn('hide')}
                /> : 
                (
                    mode === 'month-select'?
                    <MonthSelectPanel selected={selected} 
                                    toYearSelectPanel={toYearSelectPanel} 
                                    selectDate={selectThenSwitchFn('date-select')}
                    /> : 
                    <YearSelectPanel  selected={selected} 
                                    selectDate={selectThenSwitchFn('month-select')}
                    />
                )
            }
        </div>,
        rootRef.current
    );
}

export default function DatePicker({ onChange, defaultDate = new Date() }) {
    const ref = useRef();
    const today = new Date();

    const [selected, setSelectedDate] = useState(defaultDate);    
    const [display, setDisplay] = useState(isoFmt(selected));

    const [mode, setMode] = useState('hide');
    const toDateSelectPanel  = () => mode === 'hide' && setMode('date-select');
    const toMonthSelectPanel = () => setMode('month-select');
    const toYearSelectPanel  = () => setMode('year-select');

    const selectThenSwitchFn = (toMode) => {
        return (date) => {
            setSelectedDate(date);
            setDisplay(isoFmt(date));
            
            onChange(date);
            setMode(toMode);
        }
    }

    const setByTyping = e => {
        const typing = e.target.value;
        const date = new Date(e.target.value);

        setDisplay(typing);
        if(typing.length === 10 && isValidDate(date)) {
            setSelectedDate(date);
            onChange(date);
        }
    }

    return(
        <div ref={ref} className="dp-wrapper">
            <div className="dp-input">
                <Calendar className="dp-input__icon" />
                <input type="text" value={display} 
                       className={"dp-input__input"} 
                       onFocus={toDateSelectPanel} 
                       onChange={setByTyping}
                />
            </div>

            <SelectPanel rootRef={ref}
                         mode={mode} today={today} selected={selected}
                         toMonthSelectPanel={toMonthSelectPanel}
                         toYearSelectPanel={toYearSelectPanel}
                         selectThenSwitchFn={selectThenSwitchFn}
            />
        </div>
    )
}
