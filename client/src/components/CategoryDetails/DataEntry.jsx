import React, { useState } from 'react';

const DataEntryForm = ({ onSubmit }) => {
  const [day, setDay] = useState('Monday');
  const [progress, setProgress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ day, progress });
    setProgress('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Day:
        <select value={day} onChange={(e) => setDay(e.target.value)}>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </label>
      <label>
        Progress:
        <input
          type="number"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DataEntryForm;
