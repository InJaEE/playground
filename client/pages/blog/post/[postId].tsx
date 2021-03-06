import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { loadPost, deletePost, loadLikePost, islikedPost } from '@/store/actions/post';
import wrapper from '@/store/';
import BlogLayout from '@/layouts/Blog';
import { InitState } from '@/store/reducers';
import htmlParse from 'html-react-parser';
import { Button, Divider } from 'antd';
// import { LikeOutlined, LikeTwoTone } from '@ant-design/icons';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import CreateCommentForm from '@/components/CreateCommentForm';
import { getComments } from '@/store/actions/comment';
import Comment, { CommentInfo } from '@/components/Comment';
import dayjs from 'dayjs';

import hljs from 'highlight.js';
import 'highlight.js/styles/tomorrow-night.css';

const Content = () => {
	const { post /*loadLikePostLoading*/ } = useSelector((state: InitState) => state.post);
	// const [like, setLike] = useState(false);
	const { isAdmin } = useSelector((state: InitState) => state.user);
	// comments는 SWR 사용할까?
	const { comments, total } = useSelector((state: InitState) => state.comment);
	const router = useRouter();
	const dispatch = useDispatch();
	const queryParams = useMemo(() => {
		return {
			postId: router.query.postId as string,
		};
	}, [router]);

	const onModifyHandler = useCallback(() => {
		router.push(`/blog/edit/${post.id}`);
	}, [post]);
	const onDeleteHandler = useCallback(async () => {
		const flag = confirm('정말 삭제하시겠습니까?');
		if (!flag) return;
		const res = await dispatch(deletePost(queryParams));
		router.push('/blog');
	}, [router]);
	useEffect(() => {
		document.querySelectorAll('pre code').forEach((block: Element) => {
			hljs.highlightBlock(block as HTMLElement);
		});
		dispatch(getComments(queryParams));
	}, [post]);

	// const onLikeHandler = useCallback(async () => {
	// 	const res = await dispatch(islikedPost(queryParams));
	// 	fetchLike();
	// }, [router]);
	// const fetchLike = useCallback(async () => {
	// 	const loadLikePostResult = await dispatch(loadLikePost(queryParams));
	// 	if (loadLikePostResult.payload.result) {
	// 		setLike(true);
	// 	} else {
	// 		setLike(false);
	// 	}
	// }, [queryParams]);
	// useEffect(() => {
	// 	fetchLike();
	// }, [like]);

	return (
		<BlogLayout>
			<Head>
				<meta name="description" content={post.contents} />
				<meta property="og:title" content={post.title} />
				<meta property="og:description" content={post.contents} />
				<meta property="og:url" content={`https://www.injae.kr/blog/${post.id}`} />
				<meta
					property="og:image"
					content={
						post.images.length > 0
							? `https://www.injae.site/${post.images[0].path}`
							: '/favicon.ico'
					}
				/>
			</Head>
			<span css={postCategory}>{post.category.name}</span>
			<div css={postTitle}>{post.title}</div>
			{/* <div>{post.like.length}개의 추천</div> */}
			<div css={postCreatedAt}>{dayjs(post.created_at).format('YYYY년 MM월 DD일 HH:mm')}</div>
			<Divider />
			<div css={mainContentsStyle}>{htmlParse(post.contents)}</div>
			{/* <LikeButtonWrapper like={like}>
				<Button onClick={onLikeHandler} loading={loadLikePostLoading}>
					{like ? <LikeTwoTone /> : <LikeOutlined />}
					<span>좋아요</span>
				</Button>
			</LikeButtonWrapper> */}
			<Divider />
			<div css={buttonListStyle}>
				<Button onClick={() => router.push('/blog')}>목록으로</Button>
				<div>
					{isAdmin && (
						<>
							<Button onClick={onModifyHandler} css={modifyButtonStyle}>
								수정
							</Button>
							<Button onClick={onDeleteHandler} danger>
								삭제
							</Button>
						</>
					)}
				</div>
			</div>
			<Divider />
			<CreateCommentForm postId={post.id} commentType="parent" />
			<Divider />
			<div css={marginBottomStyle}>{total}개의 댓글</div>
			{total > 0 ? (
				comments.map((comment: CommentInfo) => <Comment comment={comment} postId={post.id} />)
			) : (
				<h3>댓글을 작성해주세요😊</h3>
			)}
		</BlogLayout>
	);
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async ctx => {
	// SSR할때 이미지 처리 해줘야함
	await ctx.store.dispatch(loadPost(ctx.query.postId));
	return { props: {} };
});

const mainContentsStyle = css`
	min-height: 20rem;
	& img {
		max-width: 100%;
	}
	/* & pre {
		background-color: rgb(39, 39, 39);
		color: white;
	} */
`;

const buttonListStyle = css`
	display: flex;
	justify-content: space-between;
`;

const modifyButtonStyle = css`
	color: blue;
	border: 1px solid blue;
	margin-right: 0.5rem;
`;

const marginBottomStyle = css`
	margin-bottom: 1.75rem;
`;

const postCategory = css`
	background-color: #a7efcb;
	padding: 0 8px;
`;

const postTitle = css`
	font-size: 2rem;
	font-weight: bold;
`;

const postCreatedAt = css`
	color: rgb(107, 114, 128);
	font-size: 0.75rem;
`;

type LikeButtonProps = {
	like: boolean;
};

const LikeButtonWrapper = styled.div<LikeButtonProps>`
	text-align: center;
	& span {
		${props => props.like && 'color: #40a9ff'}
	}
`;

export default Content;
