import React, { ReactNode } from 'react';
import { Row, Col } from 'antd';

type Props = {
	children: ReactNode;
};

const MemoLayout = ({ children }: Props) => {
	return (
		<Row>
			<Col lg={6} md={4} xs={0} />
			<Col lg={12} md={16} sm={24} xs={24}>
				{children}
			</Col>
			<Col lg={6} md={4} xs={0} />
		</Row>
	);
};

export default MemoLayout;
