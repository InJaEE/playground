import { instance } from '@/utils/http';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ParsedUrlQuery } from 'querystring';

export type AddPost = {
	title: string;
	contents: string;
	category_id: string;
};

interface PostId {
	postId: string;
}

interface UpdatePost extends PostId {
	post: AddPost;
}

export const loadPosts = createAsyncThunk(
	'post/loadPosts',
	async (data: ParsedUrlQuery | undefined) => {
		try {
			const res = await instance.get('/post', { params: data });
			return res.data;
		} catch (err) {}
	},
);

export const loadPost = createAsyncThunk(
	'post/loadPost',
	async (data: string | string[], thunkAPI) => {
		const res = await instance.get(`/post/${data}`);
		return res.data;
	},
);

export const addPost = createAsyncThunk('post/addPost', async (data: AddPost, thunkAPI) => {
	try {
		const res = await instance.post('/post', data);
		return res.data;
	} catch (err) {}
});

export const updatePost = createAsyncThunk(
	'post/updatePost',
	async (data: UpdatePost, thunkAPI) => {
		try {
			const res = await instance.put(`/post/${data.postId}`, data.post);
			return res.data;
		} catch (err) {}
	},
);

export const deletePost = createAsyncThunk('post/deletePost', async (data: PostId, thunkAPI) => {
	try {
		const res = await instance.delete(`/post/${data.postId}`);
		return res.data;
	} catch (err) {}
});

export const loadLikePost = createAsyncThunk('post/loadLikePost', async (data: PostId) => {
	const res = await instance.get(`post/like/${data.postId}`);
	return res.data;
});

export const islikedPost = createAsyncThunk('post/isLikedPost', async (data: PostId) => {
	const res = await instance.post(`post/like/${data.postId}`);
	return res.data;
});
