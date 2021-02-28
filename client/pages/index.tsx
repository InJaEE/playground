import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { loadPosts } from '@/store/actions/post';
import Slick from '@/components/Slick';
import { Post } from '@/store/reducers/post';
import { List, Row, Col } from 'antd';
import { css } from '@emotion/react';
import YoutubeSlick from '@/components/YoutubeSlick';
import axios from 'axios';
import dayjs from 'dayjs';
import { InitState } from '@/store/reducers/index';

export type YoutubeVideo = {
	etag: string;
	id: string;
	kind: string;
	snippet: {
		categoryId: string;
		channelId: string;
		channelTitle: string;
		defaultAudioLanguage: string;
		defaultLanguage: string;
		description: string;
		liveBroadcastContent: string;
		localized: object[];
		publishedAt: string;
		tags: string[];
		thumbnails: object[];
		title: string;
	};
};

type Props = {
	youtubeCategory: string;
	youtube: YoutubeVideo[];
};

const Home = ({ youtubeCategory, youtube }: Props) => {
	const dispatch = useDispatch();
	const { posts, loadPostsLoading } = useSelector((state: InitState) => state.post);
	const [blogPost, setBlogPost] = useState(posts);
	useEffect(() => {
		dispatch(loadPosts());
	}, [dispatch]);
	useEffect(() => {
		if (posts.length >= 5) {
			setBlogPost(posts.slice(0, 5));
		} else {
			setBlogPost(posts);
		}
	}, [posts]);
	return (
		<>
			<Slick />
			<div css={main_wrapper}>
				<Row gutter={32}>
					<Col xs={24} md={12}>
						<List
							header={<h3>Blog</h3>}
							dataSource={blogPost}
							loading={loadPostsLoading}
							renderItem={(item: Post) => (
								<List.Item>
									<Link href={`/blog/post/${item.number}`}>
										<a css={titleStyle}>{item.title}</a>
									</Link>
									<div>{dayjs(item.created_at).format('YYYY/MM/DD')}</div>
								</List.Item>
							)}
						></List>
					</Col>
					<Col xs={24} md={12}>
						<List header={<div>소식2</div>}></List>
					</Col>
				</Row>
				<div css={youtubeWrapperStyle}>
					<h2>Youtube {youtubeCategory}</h2>
					<YoutubeSlick youtube={youtube} />
				</div>
				<Row gutter={32}>
					<Col xs={24} md={12}>
						<List header={<div>소식4</div>}></List>
					</Col>
					<Col xs={24} md={12}>
						<List header={<div>소식5</div>}></List>
					</Col>
				</Row>
			</div>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const videoCategory = [
		{ name: 'Music', id: 10 },
		{ name: 'Pets&Animals', id: 15 },
		{ name: 'Sports', id: 17 },
		{ name: 'Gaming', id: 20 },
		// { name: 'Movies', id: 30 },
	];
	const selectedCategory = videoCategory[new Date().getMilliseconds() % videoCategory.length];
	try {
		const { data } = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
			params: {
				key: process.env.YOUTUBE_KEY,
				chart: 'mostPopular',
				regionCode: 'kr',
				videoCategoryId: selectedCategory.id,
				part: 'snippet',
				maxResults: 10,
			},
		});
		return { props: { youtubeCategory: selectedCategory.name, youtube: data.items } };
	} catch (err) {
		return { props: { youtubeCategory: selectedCategory.name, youtube: [] } };
	}
};

const main_wrapper = css`
	width: 80vw;
	margin: 0 auto;
	padding-top: 3rem;
`;

const titleStyle = css`
	display: inline-block;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	padding-right: 1rem;
`;

const youtubeWrapperStyle = css`
	margin: 32px 0;
`;

export default Home;
