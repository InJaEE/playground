import React, { ReactNode, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { InitState } from '@/store/reducers/index';
import axios from 'axios';
import { Row, Col, Input, Menu, Button } from 'antd';
import { headerStyle, writeButtonStyle, childrenColStyle } from './style';
import { SiTypescript, SiJavascript } from 'react-icons/si';
import { HiDesktopComputer } from 'react-icons/hi';
import { MdCreate } from 'react-icons/md';
import { css } from '@emotion/react';
import { instance } from '@/utils/http';
import userSlice from '@/store/reducers/user';
const { SubMenu } = Menu;

type Props = {
	children: ReactNode;
};

const BlogLayout = ({ children }: Props) => {
	const { isAdmin } = useSelector((state: InitState) => state.user);
	const router = useRouter();
	const dispatch = useDispatch();
	const searchHandler = useCallback(
		(value: string) => {
			router.push({ pathname: '/blog', query: { title: value } });
		},
		[router],
	);
	useEffect(() => {
		const checkSession = async () => {
			const { data } = await instance.post('/user/sessionCheck', null, {
				withCredentials: true,
			});
			if (data.isAdmin) {
				dispatch(userSlice.actions.setAdmin());
			}
		};
		checkSession();
	}, [router]);
	return (
		<>
			<Col md={0} sm={16} xs={16} offset={4}>
				<div css={mobilNavbar}>
					<Link href="/blog">전체</Link>
					<Link href={{ pathname: '/blog', query: { category: 'Typescript' } }}>Typescript</Link>
					<Link href={{ pathname: '/blog', query: { category: 'Javascript' } }}>Javscript</Link>
					<Link href={{ pathname: '/blog', query: { category: 'CS' } }}>ComputerScience</Link>
				</div>
			</Col>
			<Row css={headerStyle}>
				<Col md={6} xs={24} css={marginAuto}>
					<Input.Search placeholder="INJAE's Blog" onSearch={searchHandler} />
				</Col>
			</Row>
			<Row>
				<Col md={4} sm={0} xs={0} offset={4} css={sidebarStyle}>
					<Menu mode="inline" defaultOpenKeys={['sub1']} css={menuStyle}>
						<Menu.Item>
							<Link href="/blog">전체</Link>
						</Menu.Item>
						<SubMenu title="Development" key="sub1">
							<Menu.ItemGroup>
								<Menu.Item key="1" icon={<SiTypescript />}>
									<Link href={{ pathname: '/blog', query: { category: 'Typescript' } }}>
										Typescript
									</Link>
								</Menu.Item>
								<Menu.Item key="2" icon={<SiJavascript />}>
									<Link href={{ pathname: '/blog', query: { category: 'Javascript' } }}>
										Javscript
									</Link>
								</Menu.Item>
								<Menu.Item key="3" icon={<HiDesktopComputer />}>
									<Link href={{ pathname: '/blog', query: { category: 'CS' } }}>
										ComputerScience
									</Link>
								</Menu.Item>
							</Menu.ItemGroup>
						</SubMenu>
					</Menu>
				</Col>
				<Col md={12} sm={24} xs={24} css={childrenColStyle}>
					{children}
				</Col>
			</Row>
			{isAdmin && (
				<Link href="/blog/write">
					<Button css={writeButtonStyle} icon={<MdCreate />} />
				</Link>
			)}
		</>
	);
};

const mobilNavbar = css`
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	margin-bottom: 24px;
	& a {
		color: black;
		font-weight: bold;
	}
`;

const marginAuto = css`
	margin: auto;
`;

const menuStyle = css`
	background-color: inherit;
	& li .ant-menu-item {
		display: flex;
		align-items: center;
	}
	& li::after {
		border-right: none !important;
	}
`;

const sidebarStyle = css`
	border-right: 1px solid rgb(240, 240, 240);
	height: 70vh;
`;

export default BlogLayout;
