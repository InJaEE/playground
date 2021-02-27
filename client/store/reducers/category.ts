import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from '@/store/actions/category';

export type InitialState = {
	loadCategoriesLoading: boolean;
	loadCategoriesDone: boolean;
	loadCategoriesError: null | string;
	categories: any[];
};

const initialState: InitialState = {
	loadCategoriesLoading: false,
	loadCategoriesDone: false,
	loadCategoriesError: null,
	categories: [],
};

const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getCategories.pending, (state, action) => {
				state.loadCategoriesLoading = true;
				state.loadCategoriesDone = false;
				state.loadCategoriesError = null;
			})
			.addCase(getCategories.fulfilled, (state, action) => {
				state.loadCategoriesLoading = false;
				state.loadCategoriesDone = true;
				state.categories = action.payload.result;
			})
			.addCase(getCategories.rejected, (state, action) => {
				state.loadCategoriesLoading = false;
				state.loadCategoriesError = action.error.message!;
			});
	},
});

export default categorySlice;
