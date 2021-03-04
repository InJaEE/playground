import React from 'react';
import Link from 'next/link';
import { css } from '@emotion/react';
import { Divider } from 'antd';
import { GoogleOutlined, GithubFilled } from '@ant-design/icons';

type Props = {
	setShowMobileHeader: Function;
};

const MobileMenu = ({ setShowMobileHeader }: Props) => {
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
						<Link href="https://github.com/InJaEE">
							<a target="_blank" rel="noreferrer">
								<GithubFilled />
							</a>
						</Link>
					</div>
					<div css={menuMain}>
						<div>
							<Link href="/blog">
								<a>Blog</a>
							</Link>
						</div>
						<div>
							<Link href="/devMemo">
								<a>DevMemo</a>
							</Link>
						</div>
						<div>
							<Link href="/sports">
								<a>Sports</a>
							</Link>
						</div>
						<div>
							<Link href="/stock">
								<a>Stock</a>
							</Link>
						</div>
						<div>
							<Link href="/music">
								<a>Music</a>
							</Link>
						</div>
						<Divider />
						<div>
							<Link href="/info">
								<a>Info</a>
							</Link>
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
	& a {
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
	padding: 12px 24px;
	& div {
		font-size: 1.2rem;
		margin: 12px 0;
	}
`;

export default MobileMenu;
