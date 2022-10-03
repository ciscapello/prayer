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
  },
});

export const {fetchColumns, fetchColumnsSuccess, fetchColumnsFailure} =
  columnsSlice.actions;

export default columnsSlice.reducer;
