import { RootState } from '../store';

export const selectPrayersByColumnId = (state: RootState) => {
  const id = state.columns.activeColumnId;
  return state.prayers.prayers.filter(item => item.columnId === id);
};
