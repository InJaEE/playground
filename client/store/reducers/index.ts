import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import postSlice, { InitialState as PostInitState } from './post';
import categorySlice, { InitialState as CategoryInitState } from './category';
import commentSlice, { InitialState as CommentInitState } from './comment';
import userSlice, { InitialState as UserInitState } from './user';

export type InitState = {
	post: PostInitState;
	category: CategoryInitState;
	comment: CommentInitState;
	user: UserInitState;
};

// (이전상태, 액션) => 다음상태
// @ts-ignore
const rootReducer = (state, action) => {
	switch (action.type) {
		case HYDRATE:
			console.log('HYDRATE:::', HYDRATE);
			return action.payload;
		default: {
			const combinedReducer = combineReducers({
				post: postSlice.reducer,
				category: categorySlice.reducer,
				comment: commentSlice.reducer,
				user: userSlice.reducer,
			});
			return combinedReducer(state, action);
		}
	}
};

export default rootReducer;
