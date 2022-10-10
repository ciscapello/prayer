import { createSlice } from '@reduxjs/toolkit';
import { IComment } from '../../types';

interface CommentsState {
  comments: IComment[] | [];
  isLoading: boolean;
  isError: boolean;
}

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  isError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    getAllComments: state => {
      state.isLoading = true;
    },
    getAllCommentsSuccess: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    },
    getAllCommentsFailure: (state, action) => {
      state.isError = true;
      console.log(action);
    },
    createComment: (state, action) => {
      state.isLoading = true;
      console.log(action.payload);
    },
    createCommentSuccess: state => {
      state.isLoading = false;
    },
    createCommentsFailure: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      console.log(action.payload);
    },
  },
});

export const {
  getAllComments,
  getAllCommentsSuccess,
  getAllCommentsFailure,
  createComment,
  createCommentSuccess,
  createCommentsFailure,
} = commentsSlice.actions;

export default commentsSlice.reducer;
