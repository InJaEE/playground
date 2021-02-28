import React, { useEffect, useCallback, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useSelector } from 'react-redux';
import { loadPost } from '@/store/actions/post';
import wrapper from '@/store/';
import BlogLayout from '@/layouts/Blog';
import { InitState } from '@/store/reducers';
import htmlParse from 'html-react-parser';
import { Button, Input, Divider, Comment, Pagination, Form, Row, Col } from 'antd';
import { css } from '@emotion/react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Avatar from '@/components/Avatar/';

const Content = () => {
	const { post, loadPostLoading } = useSelector((state: InitState) => state.post);
	const [computedPost, setComputedPost] = useState(post.contents);

	useEffect(() => {
		const imageArr = post.contents.match(/\[\[image\]\]/g);
		let tempPost = post.contents;
		if (imageArr) {
			imageArr.forEach((_, index) => {
				tempPost = tempPost.replace(
					'[[image]]',
					`<img width="100%" src="http://localhost:3001/${post.images![index].path}" alt="image"/>`,
				);
			});
		}
		setComputedPost(tempPost);
	}, [post]);

	const onFinishHandler = useCallback(() => {}, []);

	return (
		<BlogLayout>
			<h1>{post.title}</h1>
			<hr />
			<div>{htmlParse(computedPost)}</div>
			<Divider />
			<div css={buttonListStyle}>
				<Button>목록으로</Button>
				<div>
					<Button css={modifyButtonStyle}>수정</Button>
					<Button danger>삭제</Button>
				</div>
			</div>
			<Divider />
			<Form onFinish={onFinishHandler}>
				<Row gutter={24} css={commentAccountAreaStyle}>
					<Col>
						<Avatar randomButton />
					</Col>
					<Col md={8} xs={10}>
						<Input type="email" prefix={<UserOutlined />} placeholder="이메일"></Input>
					</Col>
					<Col md={8} xs={10}>
						<Input type="password" prefix={<LockOutlined />} placeholder="비밀번호"></Input>
					</Col>
				</Row>
				<Row>
					<Col>이메일과 비밀번호는 댓글을 수정, 삭제하는데 사용됩니다.</Col>
				</Row>
				<Row gutter={24} css={commentInputAreaStyle}>
					<Col md={20}>
						<Input.TextArea></Input.TextArea>
					</Col>
					<Col md={4}>
						<Button htmlType="submit" type="primary" block>
							등록
						</Button>
					</Col>
				</Row>
			</Form>
			<Comment
				actions={[<span key="comment-nested-reply-to">답글달기</span>]}
				author={<a>Han Solo</a>}
				avatar={
					<Avatar
						styleCollection={{
							accessoriesType: 'Blank',
							clotheColor: 'PastelOrange',
							clotheType: 'Hoodie',
							eyeType: 'Close',
							eyebrowType: 'UpDownNatural',
							facialHairType: 'MoustacheFancy',
							hairColor: 'BlondeGolden',
							mouthType: 'Serious',
							skinColor: 'Brown',
							topType: 'LongHairCurvy',
						}}
					/>
				}
				content={
					<p>
						We supply a series of design principles, practical patterns and high quality design
						resources (Sketch and Axure).
					</p>
				}
			></Comment>
			<Pagination style={{ textAlign: 'center' }}></Pagination>
		</BlogLayout>
	);
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async ctx => {
	await ctx.store.dispatch(loadPost(ctx.query.number));
	return { props: {} };
});

const buttonListStyle = css`
	display: flex;
	justify-content: space-between;
`;

const modifyButtonStyle = css`
	color: blue;
	border: 1px solid blue;
	margin-right: 0.5rem;
`;

const commentAccountAreaStyle = css`
	display: flex;
	align-items: center;
	margin-bottom: 12px;
`;

const commentInputAreaStyle = css`
	display: flex;
	align-items: center;
`;

export default Content;
