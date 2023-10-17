// CalendarUtilFunctions.js

import { useMutation } from '@apollo/client';
import { UPDATE_DAILY_ACHIEVEMENT } from '../../utils/mutations';
import AuthService from '../../utils/auth';
import { useDispatch } from 'react-redux';
import { updateActivity, updateWeeklyProgress } from '../../Reducers/actions';

export function useCalendarFunctions(name, userProfile, entryData, setEntryData, onSave, dispatch) {
  const [updateDailyAchievement] = useMutation(UPDATE_DAILY_ACHIEVEMENT);

  const handleSave = async (selectedDate, value, weeklyProgress) => {
    if (selectedDate) {
      const currentDate = new Date();
      const firstDayOfWeek = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay()
      );
      const lastDayOfWeek = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + (6 - currentDate.getDay())
      );

      if (selectedDate >= firstDayOfWeek && selectedDate <= lastDayOfWeek) {
        if (!AuthService.loggedIn()) {
          console.error('User not authenticated.');
          return;
        }
        try {
          const response = await updateDailyAchievement({
            variables: {
              name: name, // Include categoryName in the variables
              date: selectedDate.toISOString(),
              value: parseFloat(value),
              userId: userProfile.data._id, // Provide the user's ID here
            },
          });
          if (response.data && response.data.updateDailyAchievement) {
            const updatedWeeklyProgress = parseFloat(weeklyProgress) + parseFloat(value);

            const updatedEntryData = { ...entryData };
            updatedEntryData[selectedDate.toDateString()] = {
              progress: value,
            };
            setEntryData(updatedEntryData);

            onSave({ date: selectedDate, value: parseFloat(value) });
            setDate(new Date());
            setValue('');
            setSelectedDate(null);

            const newDailyAchievement = {
              date: new Date(selectedDate.toDateString()),
              value: parseFloat(value),
              name: name,
            };

            dispatch(updateActivity(newDailyAchievement));
            dispatch({
              type: 'UPDATE_WEEKLY_PROGRESS',
              payload: parseFloat(value),
            });
          } else {
            console.error(
              'Daily achievement update failed:',
              response.data?.updateDailyAchievement?.message
            );
          }
        } catch (error) {
          console.error(
            'An error occurred while updating daily achievement:',
            error
          );
        }
      } else {
        console.error('Selected date is not within the current week.');
      }
    } else {
      console.error('Selected date is not defined.');
    }
  }

  return {
    handleSave,
  };
}
