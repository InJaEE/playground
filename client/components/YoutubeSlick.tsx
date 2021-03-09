import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import { css } from '@emotion/react';
import VideoZoom from '@/components/VideoZoom';
import { YoutubeVideo } from '@/pages/index';

type Props = {
	youtube: YoutubeVideo[];
	youtubeCategory: string;
};

const YoutubeSlick = ({ youtube, youtubeCategory }: Props) => {
	const [showVideoZoom, setShowVideoZoom] = useState(false);
	const [videoZoomSrc, setVideoZoomSrc] = useState('');
	const showVideoHandler = (src: string) => {
		setShowVideoZoom(true);
		setVideoZoomSrc(src);
	};
	return (
		<div css={youtubeWrapperStyle}>
			<h2>Youtube {youtubeCategory}</h2>
			<Carousel
				swipeable
				draggable
				showDots={false}
				responsive={responsive}
				ssr={true} // means to render carousel on server-side.
				autoPlay={true}
				infinite={true}
				autoPlaySpeed={3000}
				keyBoardControl={true}
				customTransition="all .5"
				transitionDuration={500}
				containerClass="carousel-container"
				removeArrowOnDeviceType={['tablet', 'mobile']}
				dotListClass="custom-dot-list-style"
				itemClass="carousel-item-padding-40-px"
				css={customCss}
			>
				{youtube.map((item: YoutubeVideo) => (
					<img
						src={item.snippet.thumbnails.high.url}
						alt="youtube"
						css={imgCss}
						key={item.id}
						onClick={() => showVideoHandler(item.id)}
					/>
				))}
			</Carousel>
			{showVideoZoom && <VideoZoom videoSrc={videoZoomSrc} setShowVideoZoom={setShowVideoZoom} />}
		</div>
	);
};

const imgCss = css`
	width: 100%;
	max-width: 1903px;
	max-height: 500px;
	cursor: pointer;
`;

const customCss = css`
	& .react-multiple-carousel__arrow {
		z-index: 2 !important;
	}
	& .react-multi-carousel-item {
		padding: 0.5rem;
	}
`;

const youtubeWrapperStyle = css`
	margin: 32px 0;
`;

// https://w3js.com/react-multi-carousel
const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 3,
	},
	tablet: {
		breakpoint: { max: 1024, min: 576 },
		items: 2,
	},
	mobile: {
		breakpoint: { max: 576, min: 0 },
		items: 1,
	},
};

export default YoutubeSlick;
