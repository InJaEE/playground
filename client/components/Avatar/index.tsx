import React, { CSSProperties } from 'react';
import Avataaars from 'avataaars';

export type AvatarStyle = {
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

type Prop = {
	styleCollection: AvatarStyle;
	style?: CSSProperties;
};

const Avatar = ({ styleCollection, style }: Prop) => {
	return (
		<Avataaars
			style={{ ...style, width: '50px', height: '50px' }}
			avatarStyle="Transparent"
			topType={styleCollection.topType}
			accessoriesType={styleCollection.accessoriesType}
			hairColor={styleCollection.hairColor}
			facialHairType={styleCollection.facialHairType}
			clotheType={styleCollection.clotheType}
			clotheColor={styleCollection.clotheColor}
			eyeType={styleCollection.eyeType}
			eyebrowType={styleCollection.eyebrowType}
			mouthType={styleCollection.mouthType}
			skinColor={styleCollection.skinColor}
		/>
	);
};

export default Avatar;
