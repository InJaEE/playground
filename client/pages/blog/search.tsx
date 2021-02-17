import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { loadPosts } from '@/store/actions/post';
import BlogLayout from '@/layouts/Blog';

const Search = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { posts, loadPostsLoading } = useSelector(state => state.post);
	console.log('PPPOSTS:::', posts);
	const { query } = router;
	useEffect(() => {
		console.log(query);
		dispatch(loadPosts(query));
	}, [query]);

	return <BlogLayout>{JSON.stringify(query)}</BlogLayout>;
};
export default Search;
