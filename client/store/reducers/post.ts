import { createSlice } from '@reduxjs/toolkit';
import {
	loadPosts,
	loadPost,
	addPost,
	updatePost,
	deletePost,
	loadLikePost,
	islikedPost,
} from '@/store/actions/post';

type Image = {
	id: string;
	path: string;
	postId: string;
};

type Like = {
	ip: string;
	postId: number;
	created_at: Date;
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
	like: Like[];
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
	loadLikePostLoading: boolean;
	loadLikePostDone: boolean;
	loadLikePostError: null | string;
	islikedPostLoading: boolean;
	islikedPostDone: boolean;
	islikedPostError: null | string;
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
	loadLikePostLoading: false,
	loadLikePostDone: false,
	loadLikePostError: null,
	islikedPostLoading: false,
	islikedPostDone: false,
	islikedPostError: null,
};

const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {},
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
			})
			.addCase(loadLikePost.pending, (state, action) => {
				state.loadLikePostDone = false;
				state.loadLikePostLoading = true;
				state.loadLikePostError = null;
			})
			.addCase(loadLikePost.fulfilled, (state, action) => {
				state.loadLikePostDone = true;
				state.loadLikePostLoading = false;
			})
			.addCase(loadLikePost.rejected, (state, action) => {
				state.loadLikePostLoading = false;
				state.loadLikePostError = action.error.message!;
			})
			.addCase(islikedPost.pending, (state, action) => {
				state.islikedPostDone = false;
				state.islikedPostLoading = true;
				state.islikedPostError = null;
			})
			.addCase(islikedPost.fulfilled, (state, action) => {
				state.islikedPostLoading = false;
				state.islikedPostDone = true;
			})
			.addCase(islikedPost.rejected, (state, action) => {
				state.islikedPostLoading = false;
				state.islikedPostError = action.error.message!;
			});
	},
});

export default postSlice;
