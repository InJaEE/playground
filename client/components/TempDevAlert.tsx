import React from 'react';
import { Alert } from 'antd';
import { css } from '@emotion/react';

const TempDevAlert = () => {
	return (
		<Alert
			css={overlay}
			message="현재 테스트 배포 중인 사이트입니다. "
			type="info"
			showIcon
			closable
		/>
	);
};

const overlay = css`
	position: fixed;
	height: 150px;
	width: 500px;
	margin: 0 auto;
	top: 10%;
	left: 0;
	right: 0;
	z-index: 99;
	text-align: center;
	font-size: 1.2rem;
	font-weight: bold;
`;

export default TempDevAlert;
