import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const instance = axios.create({
	baseURL: `http://localhost:3001/api/post`,
	withCredentials: true, // front, backend 간 쿠키공유
});

export const loadPosts = createAsyncThunk('post/loadPosts', async data => {
	try {
		const res = await instance.get('/', { params: data });
		return res.data;
	} catch (err) {}
});

export const loadPost = createAsyncThunk('post/loadPost', async (data, thunkAPI) => {
	const res = await instance.get(`/${data}`);
	return res.data;
});

export const addPost = createAsyncThunk('post/addPost', async (data, thunkAPI) => {
	try {
		const res = await instance.post('/', data);
		return res.data;
	} catch (err) {}
});

export const updatePost = createAsyncThunk('post/updatePost', async (data, thunkAPI) => {
	try {
		const res = await instance.put('/', data);
		return res.data;
	} catch (err) {}
});
