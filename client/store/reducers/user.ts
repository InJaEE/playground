import { createSlice } from '@reduxjs/toolkit';
import { login } from '@/store/actions/user';

export type InitialState = {
	isAdmin: boolean;
	isLoggedIn: boolean;
	loginLoading: boolean;
	loginDone: boolean;
	loginError: null | string;
};

const initialState: InitialState = {
	isAdmin: false,
	isLoggedIn: false,
	loginLoading: false,
	loginDone: false,
	loginError: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(login.pending, state => {
				state.loginLoading = true;
				state.loginDone = false;
				state.loginError = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loginLoading = false;
				state.loginDone = true;
				if (action.payload.success) {
					state.isAdmin = true;
					state.isLoggedIn = true;
				}
			})
			.addCase(login.rejected, (state, action) => {
				state.loginLoading = false;
				state.loginError = action.error.message!;
			});
	},
});

export default userSlice;
