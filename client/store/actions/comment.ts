import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AvatarStyle } from '@/components/Avatar/';

type AddComment = {
	author_id: string;
	author_pwd: string;
	contents: string;
	avatar: AvatarStyle;
};

const instance = axios.create({
	baseURL: `http://localhost:3001/api/comment`,
	withCredentials: true,
});

export const getComments = createAsyncThunk(
	'comment/getComments',
	async (data: { postId: string }) => {
		const res = await instance.get('/', {
			params: data,
		});
		return res.data;
	},
);

export const addComment = createAsyncThunk(
	'comment/addComment',
	async (data: AddComment, thunkAPI) => {
		try {
			const res = await instance.post('/', data);
			// thunkAPI.dispatch(commentSlice.actions.addComment);
			return Promise.resolve(res.data);
		} catch (err) {
			thunkAPI.rejectWithValue(err.response.data);
		}
	},
);

export const updateComment = createAsyncThunk('comment/updateComment', async (data, thunkAPI) => {
	const res = await instance.put('/', data);
	return res.data;
});
