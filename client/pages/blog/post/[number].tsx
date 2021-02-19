import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { loadPost } from '@/store/actions/post';
import BlogLayout from '@/layouts/Blog';

const Content = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { post, loadPostLoading } = useSelector(state => state.post);
	console.log('POST::', post);
	useEffect(() => {
		dispatch(loadPost(router.query.number));
	}, [dispatch]);
	return (
		<BlogLayout>
			<div>{post.title}</div>
			<div>{post.contents}</div>
		</BlogLayout>
	);
};

export default Content;
