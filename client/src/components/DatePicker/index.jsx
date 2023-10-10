import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePicker.module.css'; // Import the CSS module

function DatePickerComponent({ selectedDate, handleDateChange, label }) {
  return (
    <div className={styles['date-picker-container']}>
      <h2 className={styles['date-picker-label']}>{label}</h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        className={styles['date-picker-input']} // Apply the CSS class
      />
    </div>
  );
}

export default DatePickerComponent;