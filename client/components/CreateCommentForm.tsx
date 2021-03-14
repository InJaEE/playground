import React, { useState, useCallback, Ref } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addComment, getComments } from '@/store/actions/comment';
import { Form, Row, Col, Button, Input } from 'antd';
import { UserOutlined, LockOutlined, SyncOutlined } from '@ant-design/icons';
import Avatar, { AvatarStyle } from '@/components/Avatar';
import { css } from '@emotion/react';
import getAvatarStyle from '@/components/Avatar/avatarType';
import { InitState } from '@/store/reducers/index';

type Prop = {
	postId: string;
	commentType: 'parent' | 'child';
	parentId?: number;
};

const CreateCommentForm = ({ postId, commentType, parentId }: Prop) => {
	const [avatarStyle, setAvatarStyle] = useState<AvatarStyle>(getAvatarStyle());
	const { addCommentLoading } = useSelector((state: InitState) => state.comment);
	const dispatch = useDispatch();
	const [form] = Form.useForm();

	const onClickHandler = () => {
		setAvatarStyle(getAvatarStyle());
	};
	const onFinishHandler = useCallback(
		async value => {
			if (!value.author_id) {
				alert('이메일을 입력해주세요');
				return;
			}
			if (!value.author_pwd) {
				alert('비밀번호를 입력해주세요');
				return;
			}
			if (!value.contents) {
				alert('댓글을 입력해주세요');
				return;
			}
			value.avatar = avatarStyle;
			value.postId = postId;
			if (commentType === 'child') {
				value.depth = 1;
				value.parentId = parentId;
			}
			await dispatch(addComment(value));
			alert('댓글이 등록되었습니다.');
			form.resetFields();
			dispatch(getComments({ postId }));
		},
		[avatarStyle, postId],
	);
	return (
		<Form form={form} onFinish={onFinishHandler}>
			<Row>
				<Col md={2} xs={4} css={avatarWrapperStyle}>
					<div onClick={onClickHandler}>
						<Avatar styleCollection={avatarStyle} style={{ cursor: 'pointer' }} />
						<SyncOutlined css={randomButtonStyle} />
					</div>
				</Col>
				<Col md={20} xs={20} css={flex}>
					<Row gutter={24} css={commentAccountAreaStyle}>
						<Col md={12} xs={24}>
							<Form.Item name="author_id">
								<Input type="email" prefix={<UserOutlined />} placeholder="이메일"></Input>
							</Form.Item>
						</Col>
						<Col md={12} xs={24}>
							<Form.Item name="author_pwd">
								<Input type="password" prefix={<LockOutlined />} placeholder="비밀번호"></Input>
							</Form.Item>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row css={formDescStyle}>
				<Col>이메일과 비밀번호는 댓글을 수정, 삭제하는데 사용됩니다.</Col>
			</Row>
			<Row gutter={24} css={commentInputAreaStyle}>
				<Col md={20} xs={24}>
					<Form.Item label="댓글" name="contents">
						<Input.TextArea></Input.TextArea>
					</Form.Item>
				</Col>
				<Col md={4} xs={24}>
					<Button htmlType="submit" type="primary" loading={addCommentLoading} block>
						등록
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

const commentAccountAreaStyle = css`
	display: flex;
	align-items: center;
	& .ant-form-item {
		margin-bottom: 8px;
	}
`;

const formDescStyle = css`
	font-size: 0.75rem;
	color: gray;
`;

const commentInputAreaStyle = css`
	display: flex;
	align-items: center;
`;

const randomButtonStyle = css`
	position: absolute;
	transform: translate(-16px, 36px);
`;

const avatarWrapperStyle = css`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const flex = css`
	display: flex;
`;

export default CreateCommentForm;
