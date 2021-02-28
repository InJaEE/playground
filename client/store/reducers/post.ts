import { createSlice } from '@reduxjs/toolkit';
import { loadPosts, loadPost, addPost } from '@/store/actions/post';

type Image = {
	id: string;
	path: string;
	postId: string;
};

export type Post = {
	id: string;
	title: string;
	contents: string;
	description?: string;
	images: Image[];
	created_at: string;
	number: number;
	code_info: {
		id: string;
		name: string;
		type: string;
		description?: string;
	};
};

export type InitialState = {
	loadPostsLoading: boolean;
	loadPostsDone: boolean;
	loadPostsError: null | string;
	posts: Post[];
	loadPostLoading: boolean;
	loadPostDone: boolean;
	loadPostError: null | string;
	post: Post;
	addPostLoading: boolean;
	addPostDone: boolean;
	addPostError: null | string;
};

const initialState: InitialState = {
	loadPostsLoading: false,
	loadPostsDone: false,
	loadPostsError: null,
	posts: [],
	loadPostLoading: false,
	loadPostDone: false,
	loadPostError: null,
	post: {
		title: '',
		contents: '',
		code_info: {
			id: '',
			name: '',
			type: '',
			description: '',
		},
		created_at: '',
		id: '',
		images: [],
		number: 0,
		description: '',
	},
	addPostLoading: false,
	addPostDone: false,
	addPostError: null,
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
				state.loadPostsLoading = true;
				state.loadPostsDone = false;
				state.loadPostsError = null;
			})
			.addCase(loadPosts.fulfilled, (state, action) => {
				state.loadPostsLoading = false;
				state.loadPostsDone = true;
				state.posts = action.payload.result;
			})
			.addCase(loadPosts.rejected, (state, action) => {
				state.loadPostsLoading = false;
				state.loadPostsError = action.error.message!;
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
			})
			.addCase(loadPost.rejected, (state, action) => {
				state.loadPostLoading = false;
				state.loadPostError = action.error.message!;
			})
			.addCase(addPost.pending, (state, action) => {
				state.addPostDone = false;
				state.addPostLoading = true;
				state.addPostError = null;
			})
			.addCase(addPost.fulfilled, (state, action) => {
				state.addPostDone = true;
				state.addPostLoading = false;
			})
			.addCase(addPost.rejected, (state, action) => {
				state.addPostLoading = false;
				state.addPostError = action.error.message!;
			});
	},
});

export default postSlice;
