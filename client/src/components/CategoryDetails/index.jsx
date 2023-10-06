import DataEntryForm from './DataEntryForm';

const CategoryDetail = () => {
  // ... (previous code)

  const handleDataEntry = ({ day, progress }) => {
    // Check if an entry already exists for the selected day
    const existingEntryIndex = tableData.findIndex((item) => item.day === day);

    if (existingEntryIndex !== -1) {
      // Update the existing entry
      const updatedTableData = [...tableData];
      updatedTableData[existingEntryIndex].progress = progress;
      setTableData(updatedTableData);
    } else {
      // Create a new entry
      setTableData([...tableData, { day, progress }]);
    }
  };

  return (
    <div className="category-detail">
      {/* ... (previous code) */}
      {/* Render the DataEntryForm component */}
      <DataEntryForm onSubmit={handleDataEntry} />
      {/* Use the WeekTable component to display the table */}
      <WeekTable data={tableData} />
    </div>
  );
};
