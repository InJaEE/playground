import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { loadPosts } from '@/store/actions/post';
import Slick from '@/components/Slick';
import { List, Row, Col } from 'antd';
import { css } from '@emotion/react';
import YoutubeSlick from '@/components/YoutubeSlick';
import axios from 'axios';

type Props = {
	youtubeCategory: string;
	youtube: object[];
};

const Home = ({ youtubeCategory, youtube }: Props) => {
	const dispatch = useDispatch();
	const { posts, loadPostsLoading } = useSelector((state: any) => state.post);
	useEffect(() => {
		dispatch(loadPosts());
	}, [dispatch]);
	return (
		<>
			<Slick />
			<div css={main_wrapper}>
				<Row gutter={32}>
					<Col xs={24} md={12}>
						<List
							header={<h3>Blog</h3>}
							dataSource={posts}
							renderItem={(item: any) => (
								<List.Item>
									<Link href={`/blog/post/${item.number}`}>{item.title}</Link>
								</List.Item>
							)}
						></List>
					</Col>
					<Col xs={24} md={12}>
						<List header={<div>소식2</div>}></List>
					</Col>
				</Row>
				<div>
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
		{ name: 'Movies', id: 30 },
	];
	const selectedCategory = videoCategory[new Date().getMilliseconds() % videoCategory.length];
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
};

const main_wrapper = css`
	width: 80vw;
	margin: 0 auto;
	padding-top: 3rem;
`;

export default Home;
