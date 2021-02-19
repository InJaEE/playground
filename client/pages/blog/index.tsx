import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import BlogLayout from '@/layouts/Blog';
import { Button, List, Skeleton } from 'antd';
import { loadPosts } from '@/store/actions/post';
import wrapper from '@/store/';

const Blog = () => {
	const dispatch = useDispatch();
	const { posts, loadPostsLoading } = useSelector(state => state.post);

	useEffect(() => {
		dispatch(loadPosts());
	}, [dispatch]);

	return (
		<>
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
					dataSource={posts || listData}
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
		</>
	);
};

// wrapper.getServerSideProps(async context => {
// 	context.store.dispatch(loadPosts());
// });

const listData: any = [];
for (let i = 0; i < 23; i++) {
	listData.push({
		href: 'https://ant.design',
		title: `ant design part ${i}`,
		avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		description:
			'Ant Design, a design language for background applications, is refined by Ant UED Team.',
		content:
			'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
	});
}

export default Blog;
