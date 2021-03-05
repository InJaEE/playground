import axios from 'axios';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

const instance = axios.create({
	baseURL: `http://localhost:3001/api/user`,
	withCredentials: true,
});

export const login = createAsyncThunk('/user/login', async (data: { password: string }) => {
	const res = await instance.post('/login', { email: 'in11202@naver.com', ...data });
	return res.data;
});

export const setAdmin = createAction('user/admin');
