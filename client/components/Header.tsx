import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MenuOutlined } from '@ant-design/icons';
import MobileMenu from '@/components/MobileMenu';

type Props = {
	isMain: boolean;
};

const Header = ({ isMain }: Props) => {
	const [statePageYOffset, setPageYOffset] = useState(0);
	const [hide, setHide] = useState(false);
	const [showMobileHeader, setShowMobileHeader] = useState(false);
	const handleScroll = useCallback(() => {
		const { pageYOffset } = window;
		const deltaY = pageYOffset - statePageYOffset;
		const hide = pageYOffset !== 0 && deltaY >= 0;
		// console.log(deltaY, hide);
		setPageYOffset(deltaY);
		setHide(hide);
	}, [statePageYOffset, hide]);
	useEffect(() => {
		window.addEventListener('scroll', (evt: Event) => {
			handleScroll();
		});
	}, []);
	return (
		<HeaderWrapper isMain={isMain} hide={hide}>
			<div css={header}>
				<Link href="/">
					<a css={logoFont}>
						<div>INJAE'S</div>
						<div>PLAYGROUND</div>
					</a>
				</Link>
				<div css={menuStyle}>
					<Link href="/blog">
						<a>Blog</a>
					</Link>
					<Link href="/devMemo">
						<a>DevMemo</a>
					</Link>
					<Link href="/sports">
						<a>Sports</a>
					</Link>
					<Link href="/stock">
						<a>Stock</a>
					</Link>
					<Link href="/music">
						<a>Music</a>
					</Link>
				</div>
			</div>
			<div>
				<div css={infoStyle}>
					<Link href="/info">
						<a>Info</a>
					</Link>
				</div>
				<div css={moreButtonStyle}>
					<MenuOutlined onClick={() => setShowMobileHeader(!showMobileHeader)} />
					{showMobileHeader && <MobileMenu setShowMobileHeader={setShowMobileHeader} />}
				</div>
			</div>
		</HeaderWrapper>
	);
};

type HeaderWrapperProps = {
	isMain: boolean;
	hide: boolean;
};

const HeaderWrapper = styled.div<HeaderWrapperProps>`
	display: flex;
	padding: 0px 36px;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	left: 0px;
	top: 0px;
	right: 0px;
	z-index: 10;

	& a {
		color: inherit;
		font-weight: bold;
	}
	${props =>
		!props.isMain || props.hide
			? 'background-color: white; color: black; border-bottom: 2px solid #eeeeee'
			: 'background-color: none; color: white;'}
`;

const header = css`
	display: flex;
`;

const menuStyle = css`
	display: flex;
	align-items: center;
	margin-left: 24px;
	& a {
		margin-right: 12px;
	}
	& a:hover {
		color: #6b90b1;
	}
	@media screen and (max-width: 790px) {
		display: none;
	}
`;

const logoFont = css`
	font-family: Verdana, Geneva, Tahoma, sans-serif;
	font-size: 1.2rem;
`;

const infoStyle = css`
	@media screen and (max-width: 790px) {
		display: none;
	}
`;

const moreButtonStyle = css`
	cursor: pointer;
	@media screen and (min-width: 790px) {
		display: none;
	}
`;

export default Header;
