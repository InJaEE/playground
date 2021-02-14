import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const instance = axios.create({
	baseURL: `http://localhost:3001/api/post`,
	withCredentials: true, // front, backend 간 쿠키공유
});

export const loadPosts = createAsyncThunk('post/loadPosts', async (data, thunkAPI) => {
	try {
		const res = await instance.get('/', { params: data });
		// thunkAPI.dispatch();
		return res.data;
	} catch (err) {}
	return data;
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

export const testPost = createAsyncThunk('post/testPost', async (data, thunkAPI) => {
	// thunkAPI.dispatch();
	const res = await instance.get('/');
	return res.data;
});
