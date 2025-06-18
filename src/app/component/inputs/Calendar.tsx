'use client';

import {
  DateRange as ReactDateRange,   // ⬅ actual calendar component
  Range as RdrRange,             // ⬅ alias the *type* to avoid the clash
  RangeKeyDict,
} from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


interface CalendarProps {
    value: RdrRange;
    onChange: (value: RangeKeyDict) => void;
    disabledDates?: Date[]
}

const Calendar: React.FC<CalendarProps> = ({
    value,
    onChange,
    disabledDates
}) => {
    return (

        <ReactDateRange
         rangeColors={["#262626"]}
         ranges={[value]}
         date={new Date()}
         onChange={onChange}
         direction="vertical"
         showDateDisplay={false}
         minDate={new Date()}
         disabledDates={disabledDates}
        />
    );
}

export default Calendar;