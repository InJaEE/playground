import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const instance = axios.create({
	baseURL: `http://localhost:3001/api/category`,
	withCredentials: true,
});

export const getCategories = createAsyncThunk('/category/getCategories', async () => {
	const res = await instance.get('/');
	return res.data;
});
