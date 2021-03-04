import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const instance = axios.create({
	baseURL: `http://localhost:3001/api/user`,
	withCredentials: true,
});

export const login = createAsyncThunk('/user/login', async (data: { password: string }) => {
	const res = await instance.post('/login', data);
	return res.data;
});
