import { instance } from '@/utils/http';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AvatarStyle } from '@/components/Avatar/';

type AddComment = {
	author_id: string;
	author_pwd: string;
	contents: string;
	avatar: AvatarStyle;
};

export const getComments = createAsyncThunk(
	'comment/getComments',
	async (data: { postId: string }) => {
		const res = await instance.get('/comment', {
			params: data,
		});
		return res.data;
	},
);

export const addComment = createAsyncThunk(
	'comment/addComment',
	async (data: AddComment, thunkAPI) => {
		try {
			const res = await instance.post('/comment', data);
			// thunkAPI.dispatch(commentSlice.actions.addComment);
			return Promise.resolve(res.data);
		} catch (err) {
			thunkAPI.rejectWithValue(err.response.data);
		}
	},
);

export const updateComment = createAsyncThunk('comment/updateComment', async (data, thunkAPI) => {
	const res = await instance.put('/comment', data);
	return res.data;
});
