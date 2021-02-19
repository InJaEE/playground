import { createSlice } from '@reduxjs/toolkit';
import { loadPosts, loadPost } from '@/store/actions/post';

const initialState = {
	loadPostsLoading: false,
	loadPostsDone: false,
	loadPostsError: null,
	posts: [],
	loadPostLoading: false,
	loadPostDone: false,
	loadPostError: null,
	post: {},
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
			.addCase(loadPost.pending, state => {
				console.log('loadPosts.pending');
				state.loadPostLoading = true;
				state.loadPostDone = false;
				state.loadPostError = null;
			})
			.addCase(loadPost.fulfilled, (state, action) => {
				console.log('loadPosts.fulfilled');
				state.loadPostLoading = false;
				state.loadPostDone = true;
				state.post = action.payload.result;
				// state.mainPosts = _concat(state.mainPosts, action.payload);
				// state.hasMorePosts = action.payload.length === 10;
			})
			.addCase(loadPost.rejected, (state, action) => {
				state.loadPostLoading = false;
				// @ts-ignore
				state.loadPostError = action.error.message;
			});
	},
});

export default postSlice;
