/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { Column } from '../../types';

interface ColumnsState {
  columns: Column[] | [];
  isLoading: boolean;
  isError: boolean;
  activeColumnId: number | null;
}

const initialState: ColumnsState = {
  columns: [],
  isLoading: false,
  isError: false,
  activeColumnId: null,
};

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    fetchColumns: state => {
      state.isLoading = true;
    },
    fetchColumnsSuccess: (state, action) => {
      state.isLoading = false;
      state.columns = action.payload;
    },
    fetchColumnsFailure: (state, action) => {
      state.isError = true;
      state.isLoading = false;
    },
    createColumn: (state, action) => {
      state.isLoading = true;
    },
    createColumnSuccess: state => {
      state.isLoading = false;
    },
    createColumnFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isLoading = false;
    },
    setActiveColumnId: (state, action) => {
      state.activeColumnId = action.payload;
    },
    deleteColumn: state => {
      state.isLoading = true;
    },
    deleteColumnSuccess: state => {
      state.isLoading = false;
    },
    deleteColumnFailure: state => {
      state.isError = true;
      state.isLoading = false;
    },
    updateColumn: (state, action) => {
      state.isLoading = true;
    },
    updateColumnSuccess: state => {
      state.isLoading = false;
    },
    updateColumnFailure: (state, action) => {
      state.isError = true;
      state.isLoading = false;
    },
  },
});

export const {
  fetchColumns,
  fetchColumnsSuccess,
  fetchColumnsFailure,
  createColumn,
  createColumnSuccess,
  createColumnFailure,
  setActiveColumnId,
  deleteColumn,
  deleteColumnSuccess,
  deleteColumnFailure,
  updateColumn,
  updateColumnSuccess,
  updateColumnFailure,
} = columnsSlice.actions;

export default columnsSlice.reducer;
