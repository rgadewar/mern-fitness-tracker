// Sample data from the server response
const serverData = {
    data: {
      getDailyAchievements: [
        {
          date: "1696395600000", // Unix timestamp in milliseconds
          value: 40
        },
        {
          date: "1696568400000",
          value: 20
        },
        {
          date: "1696482000000",
          value: 60
        },
        {
          date: "1696309200000",
          value: 20
        }
      ]
    }
  };
  
  // Function to convert Unix timestamp to "YYYY-MM-DD" format
  function formatDateFromUnixTimestamp(timestamp) {
    const date = new Date(parseInt(timestamp, 10));
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  
  // Format the dates in the server data
  const formattedData = serverData.data.getDailyAchievements.map(item => ({
    date: formatDateFromUnixTimestamp(item.date),
    value: item.value
  }));
  
  console.log(formattedData);