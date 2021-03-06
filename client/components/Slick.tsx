import React from 'react';
import Carousel from 'react-multi-carousel';
import { css } from '@emotion/react';

const Slick = () => {
	return (
		<Carousel
			swipeable={false}
			draggable={false}
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
			<img width="100%" height="100%" src="/carousel/coding.jpg" css={imgCss} alt="slick" />
			<img width="100%" height="100%" src="/carousel/mlb.jpg" css={imgCss} alt="slick" />
			<img width="100%" height="100%" src="/carousel/hiphop.jpg" css={imgCss} alt="slick" />
		</Carousel>
	);
};

const imgCss = css`
	max-width: 1903px;
	max-height: 500px;
`;

const customCss = css`
	& .react-multiple-carousel__arrow {
		z-index: 2 !important;
	}
`;

// https://w3js.com/react-multi-carousel
const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 1,
	},
	tablet: {
		breakpoint: { max: 1024, min: 576 },
		items: 1,
	},
	mobile: {
		breakpoint: { max: 576, min: 0 },
		items: 1,
	},
};

export default Slick;
