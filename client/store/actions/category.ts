import { instance } from '@/utils/http';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getCategories = createAsyncThunk('/category/getCategories', async () => {
	const res = await instance.get('/category');
	return res.data;
});
