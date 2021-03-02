import React, { useEffect, useCallback, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { loadPost } from '@/store/actions/post';
import wrapper from '@/store/';
import BlogLayout from '@/layouts/Blog';
import { InitState } from '@/store/reducers';
import htmlParse from 'html-react-parser';
import { Button, Divider } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import CreateCommentForm from '@/components/CreateCommentForm';
import { getComments } from '@/store/actions/comment';
import Comment, { CommentInfo } from '@/components/Comment';

const Content = () => {
	const { post, loadPostLoading } = useSelector((state: InitState) => state.post);
	// comments는 SWR 사용할까?
	const { comments, getCommentsLoading, total } = useSelector((state: InitState) => state.comment);
	const router = useRouter();
	const dispatch = useDispatch();
	const onModifyHandler = useCallback(() => {}, []);
	const onDeleteHandler = useCallback(() => {}, []);

	useEffect(() => {
		dispatch(getComments({ postId: post.id }));
	}, [post]);

	return (
		<BlogLayout>
			<h1>{post.title}</h1>
			<hr />
			<div css={mainContentsStyle}>{htmlParse(post.contents)}</div>
			<Divider />
			<div css={buttonListStyle}>
				<Button onClick={() => router.push('/blog')}>목록으로</Button>
				<Button onClick={() => alert('준비중입니다.')}>
					<LikeOutlined />
					좋아요
				</Button>
				<div>
					<Button onClick={onModifyHandler} css={modifyButtonStyle}>
						수정
					</Button>
					<Button onClick={onDeleteHandler} danger>
						삭제
					</Button>
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

// export async function getStaticPaths() {
// 	return {
// 		paths: [{ params: { id: '1' } }],
// 		fallback: false,
// 	};
// }

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

export default Content;