/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { IComment } from '../../types';

interface CommentsState {
  comments: IComment[] | [];
  isLoading: boolean;
  isError: boolean;
  activeCommentId: number | null;
}

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  isError: false,
  activeCommentId: null,
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
    },
    createComment: (state, action) => {
      state.isLoading = true;
    },
    createCommentSuccess: state => {
      state.isLoading = false;
    },
    createCommentsFailure: (state, action) => {
      state.isError = true;
      state.isLoading = false;
    },
    setActiveMenuId: (state, action) => {
      state.activeCommentId = action.payload;
    },
    deleteComment: (state, action) => {
      state.isLoading = true;
    },
    deleteCommentSuccess: state => {
      state.isLoading = false;
    },
    deleteCommentFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
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
  setActiveMenuId,
  deleteComment,
  deleteCommentSuccess,
  deleteCommentFailure,
} = commentsSlice.actions;

export default commentsSlice.reducer;
