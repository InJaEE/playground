import { createSlice } from '@reduxjs/toolkit';
import { getComments, addComment, updateComment } from '@/store/actions/comment';

export type InitialState = {
	comments: [];
	total: number;
	getCommentsLoading: boolean;
	getCommentsDone: boolean;
	getCommentsError: null | string;
	addCommentLoading: boolean;
	addCommentDone: boolean;
	addCommentError: null | string;
	updateCommentLoading: boolean;
	updateCommentDone: boolean;
	updateCommentError: null | string;
};

const initialState: InitialState = {
	comments: [],
	total: 0,
	getCommentsLoading: false,
	getCommentsDone: false,
	getCommentsError: null,
	addCommentLoading: false,
	addCommentDone: false,
	addCommentError: null,
	updateCommentLoading: false,
	updateCommentDone: false,
	updateCommentError: null,
};

const commentSlice = createSlice({
	name: 'comment',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getComments.pending, (state, action) => {
				state.getCommentsLoading = true;
				state.getCommentsDone = false;
				state.getCommentsError = null;
			})
			.addCase(getComments.fulfilled, (state, action) => {
				state.getCommentsLoading = false;
				state.getCommentsDone = true;
				state.comments = action.payload.result;
				state.total = action.payload.total;
			})
			.addCase(getComments.rejected, (state, action) => {
				state.getCommentsLoading = false;
				state.getCommentsError = action.error.message!;
			})
			.addCase(addComment.pending, (state, action) => {
				state.addCommentLoading = true;
				state.addCommentDone = false;
				state.addCommentError = null;
			})
			.addCase(addComment.fulfilled, (state, action) => {
				state.addCommentLoading = false;
				state.addCommentDone = true;
			})
			.addCase(addComment.rejected, (state, action) => {
				state.addCommentLoading = false;
				state.addCommentError = action.error.message!;
			})
			.addCase(updateComment.pending, (state, action) => {
				state.updateCommentLoading = true;
				state.updateCommentDone = false;
				state.updateCommentError = null;
			})
			.addCase(updateComment.fulfilled, (state, action) => {
				state.updateCommentLoading = false;
				state.updateCommentDone = true;
			})
			.addCase(updateComment.rejected, (state, action) => {
				state.updateCommentLoading = false;
				state.updateCommentError = action.error.message!;
			})
			.addDefaultCase(state => state);
	},
});

export default commentSlice;
