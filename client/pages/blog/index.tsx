import React, { SyntheticEvent } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import BlogLayout from '@/layouts/Blog';
import { List, Skeleton } from 'antd';
import { loadPosts } from '@/store/actions/post';
import dayjs from 'dayjs';
import wrapper from '@/store/';
import { Post } from '@/store/reducers/post';
import { GetServerSideProps } from 'next';
import { css } from '@emotion/react';
import htmlParse from 'html-react-parser';
import { InitState } from '@/store/reducers/index';
import config from '@/config';

const Blog = () => {
	const { posts, loadPostsLoading } = useSelector((state: InitState) => state.post);
	const router = useRouter();
	return (
		<>
			<BlogLayout>
				<List
					itemLayout="vertical"
					size="large"
					pagination={{
						onChange: page => {
							// console.log(page);
						},
						pageSize: 10,
						style: { textAlign: 'center' },
					}}
					dataSource={posts}
					locale={{
						emptyText: <strong>게시글이 존재하지 않습니다.</strong>,
					}}
					renderItem={(item: Post) => {
						return loadPostsLoading ? (
							<Skeleton active />
						) : (
							<List.Item
								key={item.id}
								onClick={() => {
									router.push(`/blog/post/${item.id}`);
								}}
							>
								<div css={postHeaderStyle}>
									<div>{item.category.name}</div>
									<div>{dayjs(item.created_at).format('YYYY년 MM월 DD일')}</div>
								</div>
								<List.Item.Meta title={<span css={titleStyle}>{item.title}</span>} />
								<div css={contentsStyle}>
									<div>
										{htmlParse(item.contents.replace(/\[\[image\]\]/g, '').replace(/<[^>]+>/g, ''))}
									</div>
									{item.images.length > 0 && (
										<img
											css={previewImgStyle}
											src={`${config.IMG_URL}/${item.images[0].path}`}
											alt="image"
										/>
									)}
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
	await ctx.store.dispatch(loadPosts(ctx.query));
	return { props: {} };
});

const titleStyle = css`
	display: inline-block;
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-weight: bold;
	font-size: 1.2rem;
	cursor: pointer;
`;

const contentsStyle = css`
	display: flex;
	justify-content: space-between;
	& > div {
		max-height: 4.8em;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		color: black;
		cursor: pointer;
	}
`;

const previewImgStyle = css`
	max-height: 10em;
	max-width: 10em;
`;

const postHeaderStyle = css`
	display: flex;
	justify-content: space-between;
	color: rgba(0, 0, 0, 0.45);
	font-size: 12px;
	line-height: 1.5715;
	margin-bottom: 6px;
`;

export default Blog;
