import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { GoogleOutlined, GithubFilled } from '@ant-design/icons';
import { AiFillYoutube } from 'react-icons/ai';

type Props = {
	setShowMobileHeader: Function;
};

const MobileMenu = ({ setShowMobileHeader }: Props) => {
	const router = useRouter();
	const menuHandler = (path: string) => {
		router.push(path);
		setShowMobileHeader(false);
	};
	return (
		<>
			<div css={menuBlock} onClick={() => setShowMobileHeader(false)} />
			<nav css={mobileMenu}>
				<div css={menuWrapper}>
					<div css={menuHeader}>
						<div>INJAE'S</div>
						<div>PLAYGROUND</div>
					</div>
					<div css={linkArea}>
						<Link href="https://www.google.com">
							<a target="_blank" rel="noreferrer">
								<GoogleOutlined />
							</a>
						</Link>
						<Link href="https://www.youtube.com">
							<a target="_blank" rel="noreferrer">
								<AiFillYoutube />
							</a>
						</Link>
						<Link href="https://github.com/InJaEE">
							<a target="_blank" rel="noreferrer">
								<GithubFilled />
							</a>
						</Link>
					</div>
					<div css={menuMain}>
						<div onClick={() => menuHandler('/blog')}>
							<a>Blog</a>
						</div>
						{/* <div onClick={() => menuHandler('/devMemo')}>
							<a>DevMemo</a>
						</div>
						<div onClick={() => menuHandler('/sports')}>
							<a>Sports</a>
						</div>
						<div onClick={() => menuHandler('/stock')}>
							<a>Stock</a>
						</div>
						<div onClick={() => menuHandler('/music')}>
							<a>Music</a>
						</div> */}
						<div onClick={() => menuHandler('/info')}>
							<a>Info</a>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

const menuBlock = css`
	position: fixed;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	z-index: 40;
`;

const mobileMenu = css`
	position: fixed;
	top: 0px;
	right: 0px;
	height: 100%;
	z-index: 50;
	width: calc(100% - 128px);
	max-width: 411px;
	color: black;
`;
const linkArea = css`
	height: 50px;
	font-size: 2rem;
	padding: 0 24px;
	border-top: 1px solid lightgray;
	border-bottom: 1px solid lightgray;
	background-color: white;
	display: flex;
	align-items: center;
	& a {
		align-items: center;
		display: flex;
		margin-right: 1rem;
	}
`;

const menuWrapper = css`
	animation: 0.1s ease-in 0s 1 normal forwards running fOaBAA;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
`;

const menuHeader = css`
	background-color: rgb(40, 42, 53);
	color: white;
	height: 100px;
	padding: 1.5rem 1rem;
	font-family: Verdana, Geneva, Tahoma, sans-serif;
	font-size: 1.2rem;
	font-weight: bold;
`;

const menuMain = css`
	background-color: white;
	flex: 1 1 0%;
	overflow-y: auto;
	padding: 12px 0;
	& div {
		font-size: 1.2rem;
		padding: 12px 24px;
	}
	& div:hover {
		background-color: lightgray;
	}
`;

export default MobileMenu;
