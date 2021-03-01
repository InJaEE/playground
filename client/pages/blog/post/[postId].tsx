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
	const { comments, getCommentsLoading, total } = useSelector((state: InitState) => state.comment);
	const [computedPost, setComputedPost] = useState(post.contents);
	const router = useRouter();
	const dispatch = useDispatch();
	const onModifyHandler = useCallback(() => {}, []);
	const onDeleteHandler = useCallback(() => {}, []);

	useEffect(() => {
		const imageArr = post.contents.match(/\[\[image\]\]/g);
		let tempPost = post.contents;
		if (imageArr) {
			imageArr.forEach((_, index) => {
				tempPost = tempPost.replace(
					'[[image]]',
					`<img style="max-width: 100%;" src="http://localhost:3001/${
						post.images![index].path
					}" alt="image"/>`,
				);
			});
		}
		setComputedPost(tempPost);
		dispatch(getComments({ postId: post.id }));
	}, [post]);

	return (
		<BlogLayout>
			<h1>{post.title}</h1>
			<hr />
			<div css={mainContentsStyle}>{htmlParse(computedPost)}</div>
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

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async ctx => {
	await ctx.store.dispatch(loadPost(ctx.query.postId));
	return { props: {} };
});

const mainContentsStyle = css`
	min-height: 20rem;
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
