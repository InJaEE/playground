import React from 'react';
import { css } from '@emotion/react';
import { ImGithub } from 'react-icons/im';

const Footer = () => {
	return (
		<div css={footerWrapperStyle}>
			<div css={footerInfoStyle}>
				<div>
					<strong>INJAE'S</strong>
				</div>
				<strong>PLAYGROUND</strong>
			</div>
			<a css={circleStyle} href="https://github.com/InJaEE" target="_blank" rel="noreferrer">
				<ImGithub />
			</a>
		</div>
	);
};

const footerWrapperStyle = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: rgb(47, 49, 66);
	padding: 2.2rem 0.75rem;
	color: white;
	font-size: 1.5rem;
	font-weight: bold;
	@media screen and (max-width: 790px) {
		flex-direction: column;
	}
`;

const footerInfoStyle = css``;

const circleStyle = css`
	width: 32px;
	height: 32px;
	border: 1px solid white;
	border-radius: 16px;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	&:hover {
		color: inherit;
	}
`;

export default Footer;
