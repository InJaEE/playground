import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import postSlice from './post';

// (이전상태, 액션) => 다음상태
// @ts-ignore
const rootReducer = (state, action) => {
	switch (action.type) {
		case HYDRATE:
			console.log('HYDRATE ::: ', HYDRATE);
			return action.payload;
		default: {
			const combinedReducer = combineReducers({
				post: postSlice.reducer,
			});
			return combinedReducer(state, action);
		}
	}
};

export default rootReducer;
