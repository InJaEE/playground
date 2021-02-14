import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { css } from '@emotion/react';

const Slick = () => {
	return (
		<Carousel
			swipeable={false}
			draggable={false}
			showDots={true}
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
			<img src="/carousel/coding.jpg" width="1903px" height="510.375em" />
			<img src="/carousel/mlb.jpg" width="1903px" height="510.375em" />
			<img src="/carousel/hiphop.jpg" width="1903px" height="510.375em" />
		</Carousel>
	);
};

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
		breakpoint: { max: 1024, min: 464 },
		items: 1,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
	},
};

export default Slick;
