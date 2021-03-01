import React, { useState } from 'react';
import { Comment as AntdComment, Divider } from 'antd';
import { AvatarStyle } from '@/components/Avatar/index';
import Avatar from '@/components/Avatar/';
import CreateCommentForm from '@/components/CreateCommentForm';
import { css } from '@emotion/react';
import dayjs from 'dayjs';

interface SingleComment {
	id: number;
	contents: string;
	author_id: string;
	author_pwd: string;
	author_ip: string;
	depth?: number;
	parentId?: number | null;
	created_at: string;
	updated_at?: string;
	use_yn: 'Y' | 'N';
	postId: string;
	avatarId: string;
	avatar: AvatarStyle;
}

export interface CommentInfo extends SingleComment {
	children: SingleComment[];
}

type Props = {
	comment: CommentInfo;
	postId: string;
};

const Comment = ({ comment, postId }: Props) => {
	const [openAddReplyComment, setOpenAddReplyComment] = useState(false);
	const [openReplyComments, setOpenReplyComments] = useState(false);
	return (
		<>
			<AntdComment
				key={comment.id}
				actions={[
					<span>{dayjs(comment.created_at).format('YYYY년 MM월 DD일')}</span>,
					<span onClick={() => setOpenAddReplyComment(!openAddReplyComment)}>답글달기</span>,
					<>
						{comment.children.length > 0 && (
							<span onClick={() => setOpenReplyComments(!openReplyComments)}>답글보기</span>
						)}
					</>,
				]}
				author={<a>{comment.author_id}</a>}
				avatar={
					<Avatar
						styleCollection={{
							accessoriesType: comment.avatar.accessoriesType,
							clotheColor: comment.avatar.clotheColor,
							clotheType: comment.avatar.clotheType,
							eyeType: comment.avatar.eyeType,
							eyebrowType: comment.avatar.eyebrowType,
							facialHairType: comment.avatar.facialHairType,
							hairColor: comment.avatar.hairColor,
							mouthType: comment.avatar.mouthType,
							skinColor: comment.avatar.skinColor,
							topType: comment.avatar.topType,
						}}
					/>
				}
				content={<p>{comment.contents}</p>}
			/>
			{openReplyComments && (
				<>
					<Divider />
					{comment.children.map(child => (
						<AntdComment
							css={childFormStyle}
							avatar={
								<Avatar
									styleCollection={{
										accessoriesType: child.avatar.accessoriesType,
										clotheColor: child.avatar.clotheColor,
										clotheType: child.avatar.clotheType,
										eyeType: child.avatar.eyeType,
										eyebrowType: child.avatar.eyebrowType,
										facialHairType: child.avatar.facialHairType,
										hairColor: child.avatar.hairColor,
										mouthType: child.avatar.mouthType,
										skinColor: child.avatar.skinColor,
										topType: child.avatar.topType,
									}}
								/>
							}
							author={<a>{child.author_id}</a>}
							content={<p>{child.contents}</p>}
						/>
					))}
					<Divider />
				</>
			)}
			{openAddReplyComment && (
				<>
					<Divider />
					<div css={childFormStyle}>
						<CreateCommentForm
							key={`${comment.id}00`}
							postId={postId}
							commentType="child"
							parentId={comment.id}
						/>
					</div>
					<Divider />
				</>
			)}
		</>
	);
};

const childFormStyle = css`
	margin-left: 3rem;
`;

export default Comment;
