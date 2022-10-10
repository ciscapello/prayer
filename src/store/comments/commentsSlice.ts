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
    setActiveMenuId: (state, action) => {
      state.activeCommentId = action.payload;
    },
    deleteComment: (state, action) => {
      state.isLoading = true;
      console.log(action);
    },
    deleteCommentSuccess: state => {
      state.isLoading = false;
    },
    deleteCommentFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.log(action);
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
