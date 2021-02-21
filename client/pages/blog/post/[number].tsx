import React from 'react';
import { GetServerSideProps } from 'next';
import { useSelector } from 'react-redux';
import { loadPost } from '@/store/actions/post';
import wrapper from '@/store/';
import BlogLayout from '@/layouts/Blog';

const Content = () => {
	const { post, loadPostLoading } = useSelector(state => state.post);
	return (
		<BlogLayout>
			<h1>{post.title}</h1>
			<hr />
			<div>{post.contents}</div>
		</BlogLayout>
	);
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async ctx => {
	await ctx.store.dispatch(loadPost(ctx.query.number));
	return { props: {} };
});

export default Content;
