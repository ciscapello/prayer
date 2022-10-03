import {createSlice} from '@reduxjs/toolkit';
import {Column} from '../../types';

interface ColumnsState {
  columns: Column[] | [];
  isLoading: boolean;
  isError: boolean;
}

const initialState: ColumnsState = {
  columns: [],
  isLoading: false,
  isError: false,
};

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    fetchColumns: state => {
      // console.log(action);
      state.isLoading = true;
    },
    fetchColumnsSuccess: (state, action) => {
      state.isLoading = false;
      state.columns = action.payload;
    },
    fetchColumnsFailure: (state, action) => {
      state.isError = true;
      console.log(action);
    },
    createColumn: (state, action) => {
      state.isLoading = true;
      console.log(action);
    },
    createColumnSuccess: state => {
      state.isLoading = false;
    },
    createColumnFailure: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.isError = true;
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
} = columnsSlice.actions;

export default columnsSlice.reducer;
