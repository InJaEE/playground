import { instance } from '@/utils/http';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk('/user/login', async (data: { password: string }) => {
	const res = await instance.post('/user/login', { email: 'in11202@naver.com', ...data });
	return res.data;
});
