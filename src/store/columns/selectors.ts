import { RootState } from '../store';

export const selectColumnId = (state: RootState) => {
  return state.columns.activeColumnId;
};
