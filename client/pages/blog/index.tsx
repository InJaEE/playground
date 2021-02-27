import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import BlogLayout from '@/layouts/Blog';
import { List, Skeleton } from 'antd';
import { loadPosts } from '@/store/actions/post';
import dayjs from 'dayjs';
import wrapper from '@/store/';
import { GetServerSideProps } from 'next';

const Blog = () => {
	const { posts, loadPostsLoading } = useSelector((state: any) => state.post);
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
					dataSource={posts}
					renderItem={(item: any) => {
						return loadPostsLoading ? (
							<Skeleton active />
						) : (
							<List.Item key={item.id}>
								<div style={{ display: 'flex', justifyContent: 'space-between' }}>
									<div className="ant-list-item-meta-description">{item.code_info.name}</div>
									<div>{dayjs(item.created_at).format('YYYY/MM/DD')}</div>
								</div>
								<List.Item.Meta
									title={<Link href={`/blog/post/${item.number}`}>{item.title}</Link>}
								/>
								{item.contents}
							</List.Item>
						);
					}}
				/>
			</BlogLayout>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async ctx => {
	await ctx.store.dispatch(loadPosts());
	return { props: {} };
});

export default Blog;
