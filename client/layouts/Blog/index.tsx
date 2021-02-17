import React, { ReactNode, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Row, Col, Input, Menu, Button } from 'antd';
import { headerStyle, writeButtonStyle } from './style';
import { SiTypescript, SiJavascript } from 'react-icons/si';
import { HiDesktopComputer } from 'react-icons/hi';
import { MdCreate } from 'react-icons/md';
const { SubMenu } = Menu;

type Props = {
	children: ReactNode;
};

const BlogLayout = ({ children }: Props) => {
	const router = useRouter();
	const searchHandler = useCallback(
		(value: string) => {
			router.push({ pathname: '/blog/search', query: { title: value } });
		},
		[router],
	);
	return (
		<>
			<Row css={headerStyle}>
				<Col md={8} offset={8}>
					<Input.Search placeholder="INJAE's Blog" onSearch={searchHandler} />
				</Col>
			</Row>
			<Row>
				<Col md={4} offset={4} xs={0}>
					<Menu mode="inline" defaultOpenKeys={['sub1']} style={{ backgroundColor: 'inherit' }}>
						<Menu.Item>전체</Menu.Item>
						<SubMenu title="Development" key="sub1">
							<Menu.ItemGroup>
								<Menu.Item key="1" icon={<SiTypescript />}>
									<Link href={{ pathname: '/blog/search', query: { category: 'Typescript' } }}>
										Typescript
									</Link>
								</Menu.Item>
								<Menu.Item key="2" icon={<SiJavascript />}>
									<Link href={{ pathname: '/blog/search', query: { category: 'Javascript' } }}>
										Javscript
									</Link>
								</Menu.Item>
								<Menu.Item key="3" icon={<HiDesktopComputer />}>
									<Link href={{ pathname: '/blog/search', query: { category: 'ComputerScience' } }}>
										ComputerScience
									</Link>
								</Menu.Item>
							</Menu.ItemGroup>
						</SubMenu>
					</Menu>
				</Col>
				<Col md={12} xs={24}>
					{children}
				</Col>
			</Row>
			<Link href="/blog/write">
				<Button css={writeButtonStyle} icon={<MdCreate />} />
			</Link>
		</>
	);
};

const listData: any = [];
for (let i = 0; i < 23; i++) {
	listData.push({
		href: 'https://ant.design',
		title: `ant design part ${i}`,
		avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		description:
			'Ant Design, a design language for background applications, is refined by Ant UED Team.',
		content:
			'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
	});
}

export default BlogLayout;
