import React from 'react';
import { Row, Col } from 'antd';

const Info = () => {
	return (
		<>
			<Row>
				<Col md={6} />
				<Col md={12} sm={24} xs={24}>
					<h2>INJAE's Playground</h2>
					<strong>해보고 싶은것들을 마음대로 적용해보는 개인 프로젝트입니다.</strong>
				</Col>
				<Col md={6} />
			</Row>
		</>
	);
};

export default Info;
