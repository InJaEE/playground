import { createSlice } from '@reduxjs/toolkit';
import { loadPosts, loadPost, addPost, updatePost, deletePost } from '@/store/actions/post';

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
	category_id: string;
	images: Image[];
	created_at: string;
	number: number;
	category: {
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
	updatePostLoading: boolean;
	updatePostDone: boolean;
	updatePostError: null | string;
	deletePostLoading: boolean;
	deletePostDone: boolean;
	deletePostError: null | string;
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
		category_id: '',
		category: {
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
	updatePostLoading: false,
	updatePostDone: false,
	updatePostError: null,
	deletePostLoading: false,
	deletePostDone: false,
	deletePostError: null,
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
				state.loadPostLoading = true;
				state.loadPostDone = false;
				state.loadPostError = null;
			})
			.addCase(loadPost.fulfilled, (state, action) => {
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
			})
			.addCase(updatePost.pending, (state, action) => {
				state.updatePostDone = false;
				state.updatePostLoading = true;
				state.updatePostError = null;
			})
			.addCase(updatePost.fulfilled, (state, action) => {
				state.updatePostDone = true;
				state.updatePostLoading = false;
			})
			.addCase(updatePost.rejected, (state, action) => {
				state.updatePostLoading = false;
				state.updatePostError = action.error.message!;
			})
			.addCase(deletePost.pending, (state, action) => {
				state.deletePostDone = false;
				state.deletePostLoading = true;
				state.deletePostError = null;
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				state.deletePostDone = true;
				state.deletePostLoading = false;
			})
			.addCase(deletePost.rejected, (state, action) => {
				state.deletePostLoading = false;
				state.deletePostError = action.error.message!;
			});
	},
});

export default postSlice;
