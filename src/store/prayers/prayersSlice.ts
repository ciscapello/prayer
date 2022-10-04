import { createSlice } from '@reduxjs/toolkit';
import { Prayer } from '../../types';

interface ColumnsState {
  isLoading: boolean;
  isError: boolean;
  prayers: Prayer[] | [];
}

const initialState: ColumnsState = {
  isLoading: false,
  isError: false,
  prayers: [],
};

export const prayersSlice = createSlice({
  name: 'prayers',
  initialState,
  reducers: {
    getAllPrayers: state => {
      state.isLoading = true;
    },
    getAllPrayersSuccess: (state, action) => {
      state.isLoading = false;
      state.prayers = action.payload;
    },
    getAllPrayersFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.log(action);
    },
  },
});

export const { getAllPrayers, getAllPrayersSuccess, getAllPrayersFailure } =
  prayersSlice.actions;

export default prayersSlice.reducer;
