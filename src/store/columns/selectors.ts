import { RootState } from '../store';

export const selectColumnId = (state: RootState) => {
  return state.columns.activeColumnId;
};

export const getAllColumns = (state: RootState) => {
  return state.columns.columns;
};
