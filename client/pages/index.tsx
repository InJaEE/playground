import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import Slick from '@/components/Slick';
import { List, Row, Col } from 'antd';
import { css } from '@emotion/react';

function Home() {
	const router = useRouter();
	// useEffect(() => {
	// 	return () => {
	// 		alert('준비중입니다.');
	// 		router.push('/');
	// 	};
	// }, []);
	return (
		<>
			<Slick />
			<div css={main_wrapper}>
				<Row gutter={32}>
					<Col xs={24} md={12}>
						<List header={<div>소식1</div>}></List>
					</Col>
					<Col xs={24} md={12}>
						<List header={<div>소식2</div>}></List>
					</Col>
				</Row>
				<Row>
					<Col xs={24} md={24}>
						<List header={<div>소식3</div>}></List>
					</Col>
				</Row>
				<Row gutter={32}>
					<Col xs={24} md={12}>
						<List header={<div>소식4</div>}></List>
					</Col>
					<Col xs={24} md={12}>
						<List header={<div>소식5</div>}></List>
					</Col>
				</Row>
			</div>
		</>
	);
}
const main_wrapper = css`
	width: 80vw;
	margin: 0 auto;
	padding-top: 3rem;
`;

export default Home;
