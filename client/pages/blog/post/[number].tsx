import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useSelector } from 'react-redux';
import { loadPost } from '@/store/actions/post';
import wrapper from '@/store/';
import BlogLayout from '@/layouts/Blog';
import { InitState } from '@/store/reducers';
import htmlParse from 'html-react-parser';

const Content = () => {
	const { post, loadPostLoading } = useSelector((state: InitState) => state.post);

	const [computedPost, setComputedPost] = useState(post.contents);
	useEffect(() => {
		const imageArr = post.contents.match(/\[\[image\]\]/g);
		let tempPost = post.contents;
		if (imageArr) {
			imageArr.forEach((_, index) => {
				tempPost = tempPost.replace(
					'[[image]]',
					`<img width="100%" src="http://localhost:3001/${post.images![index].path}" alt="image"/>`,
				);
			});
		}
		setComputedPost(tempPost);
	}, [post]);

	return (
		<BlogLayout>
			<h1>{post.title}</h1>
			<hr />
			<div>{htmlParse(computedPost)}</div>
		</BlogLayout>
	);
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async ctx => {
	await ctx.store.dispatch(loadPost(ctx.query.number));
	return { props: {} };
});

export default Content;
