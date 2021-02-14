import { createSlice } from '@reduxjs/toolkit';
import { loadPosts, testPost } from '@/store/actions/post';

const initialState = {
	loadPostsLoading: false,
	loadPostsDone: false,
	loadPostsError: null,
	posts: [],
	postTest: '',
};

const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		loadPost(state, action) {},
	},
	extraReducers(builder) {
		builder
			.addCase(loadPosts.pending, state => {
				console.log('loadPosts.pending');
				state.loadPostsLoading = true;
				state.loadPostsDone = false;
				state.loadPostsError = null;
			})
			.addCase(loadPosts.fulfilled, (state, action) => {
				console.log('loadPosts.fulfilled');
				state.loadPostsLoading = false;
				state.loadPostsDone = true;
				state.posts = action.payload.result;
				// state.mainPosts = _concat(state.mainPosts, action.payload);
				// state.hasMorePosts = action.payload.length === 10;
			})
			.addCase(loadPosts.rejected, (state, action) => {
				state.loadPostsLoading = false;
				// @ts-ignore
				state.loadPostsError = action.error.message;
			})
			.addCase(testPost.pending, state => {
				state.postTest = '22';
			})
			.addCase(testPost.fulfilled, (state, action) => {
				console.log('action::', action);

				state.postTest = action.payload;
			});
	},
});

export default postSlice;
