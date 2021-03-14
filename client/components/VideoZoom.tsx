import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { CloseOutlined } from '@ant-design/icons';

type Props = {
	videoSrc: string;
	setShowVideoZoom: Function;
};

const VideoZoom = ({ videoSrc, setShowVideoZoom }: Props) => {
	return (
		<Overlay
			onClick={() => {
				setShowVideoZoom(false);
			}}
		>
			<div css={headerCss} onClick={() => setShowVideoZoom(false)}>
				<CloseOutlined />
			</div>
			<iframe
				title="youtube video player"
				type="text/html"
				src={`https://www.youtube.com/embed/${videoSrc}`}
				frameBorder="0"
				allowFullScreen
			></iframe>
		</Overlay>
	);
};

const Overlay = styled.div`
	position: fixed;
	top: 15vh;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.5);
	max-height: 700px;
	padding: 2rem 5rem;
	z-index: 5000;
	& iframe {
		width: 100%;
		height: 100%;
	}
`;

const headerCss = css`
	position: absolute;
	top: 12px;
	right: 12px;
	height: 1.5rem;
	width: 1.5rem;
	color: white;
	font-size: 1.75rem;
	cursor: pointer;
`;

export default VideoZoom;
