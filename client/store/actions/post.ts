import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ParsedUrlQuery } from 'querystring';

const instance = axios.create({
	baseURL: `http://localhost:3001/api/post`,
	withCredentials: true, // front, backend 간 쿠키공유
});

export type AddPost = {
	title: string;
	contents: string;
	category_id: string;
};

export const loadPosts = createAsyncThunk(
	'post/loadPosts',
	async (data: ParsedUrlQuery | undefined) => {
		try {
			const res = await instance.get('/', { params: data });
			return res.data;
		} catch (err) {}
	},
);

export const loadPost = createAsyncThunk(
	'post/loadPost',
	async (data: string | string[], thunkAPI) => {
		const res = await instance.get(`/${data}`);
		return res.data;
	},
);

export const addPost = createAsyncThunk('post/addPost', async (data: AddPost, thunkAPI) => {
	try {
		const res = await instance.post('/', data);
		return res.data;
	} catch (err) {}
});

type UpdatePost = {
	post: AddPost;
	postId: string;
};

export const updatePost = createAsyncThunk(
	'post/updatePost',
	async (data: UpdatePost, thunkAPI) => {
		try {
			const res = await instance.put(`/${data.postId}`, data.post);
			return res.data;
		} catch (err) {}
	},
);

type DeletePost = {
	postId: string;
};

export const deletePost = createAsyncThunk(
	'post/deletePost',
	async (data: DeletePost, thunkAPI) => {
		try {
			const res = await instance.delete(`/${data.postId}`);
			return res.data;
		} catch (err) {}
	},
);
