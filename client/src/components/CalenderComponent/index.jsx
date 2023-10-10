import React, { useReducer } from 'react';
import Calendar from 'react-calendar';
import { useReducer } from 'react';

const CalendarComponent = ({ onSave }) => {
  const [date, setDate] = useReducer(new Date());
  const [value, setValue] = useReducer('');

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleSave = () => {
    onSave({ date, value });
    setDate(new Date());
    setValue('');
  };

  return (
    <div>
      <h2>Calendar</h2>
      <div>
        <Calendar onChange={handleDateChange} value={date} />
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter value"
          value={value}
          onChange={handleValueChange}
        />
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default CalendarComponent;
