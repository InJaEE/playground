import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import postSlice, { InitialState as PostInitState } from './post';
import categorySlice, { InitialState as CategoryInitState } from './category';

export type InitState = {
	post: PostInitState;
	category: CategoryInitState;
};

// (이전상태, 액션) => 다음상태
// @ts-ignore
const rootReducer = (state, action) => {
	switch (action.type) {
		case HYDRATE:
			return action.payload;
		default: {
			const combinedReducer = combineReducers({
				post: postSlice.reducer,
				category: categorySlice.reducer,
			});
			return combinedReducer(state, action);
		}
	}
};

export default rootReducer;
