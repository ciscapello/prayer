/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Prayer } from '../../types';

interface PrayersState {
  isLoading: boolean;
  isError: boolean;
  prayers: Prayer[] | [];
  activePrayerId: number | null;
}

const initialState: PrayersState = {
  isLoading: false,
  isError: false,
  prayers: [],
  activePrayerId: null,
};

export const prayersSlice = createSlice({
  name: 'prayers',
  initialState,
  reducers: {
    setActivePrayerId: (state, action) => {
      state.activePrayerId = action.payload;
    },
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
    },
    toggleCheckedPrayer: (state, action: PayloadAction<Prayer>) => {
      const id = action.payload.id;
      const checkState = state.prayers.find(item => item.id === id)?.checked;
      state.prayers.find(item => item.id === id)!.checked = !checkState;
    },
    toggleCheckedPrayerFailure: (state, action) => {
      state.isError = true;
      state.isLoading = false;
    },
    createPrayer: (state, action) => {
      state.isLoading = true;
    },
    createPrayerSuccess: state => {
      state.isLoading = false;
    },
    createPrayerFailure: (state, action) => {
      state.isError = true;
      state.isLoading = false;
    },
    deletePrayer: (state, action) => {
      state.isLoading = true;
    },
    deletePrayerSuccess: state => {
      state.isLoading = false;
    },
    deletePrayerFailure: (state, action) => {
      state.isError = true;
      state.isLoading = false;
    },
  },
});

export const {
  getAllPrayers,
  getAllPrayersSuccess,
  getAllPrayersFailure,
  toggleCheckedPrayer,
  toggleCheckedPrayerFailure,
  createPrayer,
  createPrayerSuccess,
  createPrayerFailure,
  setActivePrayerId,
  deletePrayer,
  deletePrayerFailure,
  deletePrayerSuccess,
} = prayersSlice.actions;

export default prayersSlice.reducer;
