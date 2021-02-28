import React, { useState, useEffect } from 'react';
import Avataaars from 'avataaars';
import getAvatarStyle from './avatarType';
import { SyncOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';

type AvatarStyle = {
	topType: string;
	accessoriesType: string;
	hairColor: string;
	facialHairType: string;
	clotheType: string;
	clotheColor: string;
	eyeType: string;
	eyebrowType: string;
	mouthType: string;
	skinColor: string;
};

const initAvatarStyle = {
	topType: '',
	accessoriesType: '',
	hairColor: '',
	facialHairType: '',
	clotheType: '',
	clotheColor: '',
	eyeType: '',
	eyebrowType: '',
	mouthType: '',
	skinColor: '',
};

type Prop = {
	styleCollection?: AvatarStyle;
	randomButton?: boolean;
};

const Avatar = ({ styleCollection, randomButton }: Prop) => {
	const [
		{
			topType,
			accessoriesType,
			hairColor,
			facialHairType,
			clotheType,
			clotheColor,
			eyeType,
			eyebrowType,
			mouthType,
			skinColor,
		},
		setAvatarStyle,
	] = useState<AvatarStyle>(initAvatarStyle);
	const onClickHandler = () => {
		const style = getAvatarStyle();
		console.log(style);
		setAvatarStyle(style);
	};
	useEffect(() => {
		if (styleCollection) {
			setAvatarStyle(styleCollection);
		} else {
			onClickHandler();
		}
	}, [styleCollection]);
	return (
		<>
			<Avataaars
				style={{ width: '50px', height: '50px' }}
				avatarStyle="Circle"
				topType={topType}
				accessoriesType={accessoriesType}
				hairColor={hairColor}
				facialHairType={facialHairType}
				clotheType={clotheType}
				clotheColor={clotheColor}
				eyeType={eyeType}
				eyebrowType={eyebrowType}
				mouthType={mouthType}
				skinColor={skinColor}
			/>
			{randomButton && <SyncOutlined css={randomButtonStyle} onClick={onClickHandler} />}
		</>
	);
};

const randomButtonStyle = css`
	position: absolute;
	top: 2.25rem;
	right: 0.75rem;
`;

export default Avatar;
