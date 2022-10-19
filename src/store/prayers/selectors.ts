import { RootState } from '../store';

export const selectPrayersByColumnId = (state: RootState) => {
  const id = state.columns.activeColumnId;
  return state.prayers.prayers.filter(item => item.columnId === id);
};

export const selectAnsweredPrayersByColumnId = (state: RootState) => {
  const id = state.columns.activeColumnId;
  return state.prayers.prayers
    .filter(item => item.columnId === id)
    .filter(item => item.checked === true);
};

export const selectNotAnsweredPrayersByColumnId = (state: RootState) => {
  const id = state.columns.activeColumnId;
  return state.prayers.prayers
    .filter(item => item.columnId === id)
    .filter(item => item.checked === false);
};
