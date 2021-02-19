import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { List, Skeleton } from 'antd';
import { loadPosts } from '@/store/actions/post';
import BlogLayout from '@/layouts/Blog';

const Search = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { posts, loadPostsLoading } = useSelector(state => state.post);
	const { query } = router;
	useEffect(() => {
		console.log(query);
		dispatch(loadPosts(query));
	}, [query]);

	return (
		<BlogLayout>
			<List
				itemLayout="vertical"
				size="large"
				pagination={{
					onChange: page => {
						console.log(page);
					},
					pageSize: 10,
					style: { textAlign: 'center' },
				}}
				dataSource={posts || []}
				renderItem={(item: any) => {
					return loadPostsLoading ? (
						<Skeleton active />
					) : (
						<List.Item key={item.id}>
							<List.Item.Meta
								title={<Link href={`/blog/post/${item.number}`}>{item.title}</Link>}
								description={item.code_info.name}
							/>
							{item.contents} {item.created_at}
						</List.Item>
					);
				}}
			/>
		</BlogLayout>
	);
};
export default Search;
