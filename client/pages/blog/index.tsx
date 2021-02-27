import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import BlogLayout from '@/layouts/Blog';
import { List, Skeleton } from 'antd';
import { loadPosts } from '@/store/actions/post';
import dayjs from 'dayjs';
import wrapper from '@/store/';
import { GetServerSideProps } from 'next';
import { css } from '@emotion/react';
import htmlParse from 'html-react-parser';

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
								<div css={contentsStyle}>
									<div>{htmlParse(item.contents.replace(/\[\[image\]\]/g, ''))}</div>
									<div>
										{item.images[0]?.path ? (
											<img
												width="162px"
												src={`http://localhost:3001/${item.images[0].path}`}
												alt="no image"
											/>
										) : (
											<img width="162px" src="https://i.stack.imgur.com/y9DpT.jpg" alt="no image" />
										)}
									</div>
								</div>
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

const contentsStyle = css`
	display: flex;
	justify-content: space-between;
`;

export default Blog;
